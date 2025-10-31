/*
=============================================================
 Script de ejecución general con pruebas de vistas y procedimientos almacenados
=============================================================
*/
USE WideWorldImporters;
GO

PRINT '===== CREANDO VISTAS =====';
GO

-- ==========================================================
-- 01 - vw_Clientes
-- ==========================================================
CREATE OR ALTER VIEW vw_Clientes AS
SELECT 
    c.CustomerID,
    c.CustomerName AS NombreCliente,
    cc.CustomerCategoryName AS Categoria,
    dm.DeliveryMethodName AS MetodoEntrega
FROM Sales.Customers c
JOIN Sales.CustomerCategories cc 
    ON c.CustomerCategoryID = cc.CustomerCategoryID
JOIN Application.DeliveryMethods dm 
    ON c.DeliveryMethodID = dm.DeliveryMethodID;
GO

-- ==========================================================
-- 02 - vw_Proveedores
-- ==========================================================
CREATE OR ALTER VIEW vw_Proveedores AS
SELECT 
    s.SupplierID,
    s.SupplierName AS NombreProveedor,
    sc.SupplierCategoryName AS Categoria,
    dm.DeliveryMethodName AS MetodoEntrega,
    p1.FullName AS ContactoPrimario,
    p2.FullName AS ContactoAlternativo,
    s.PhoneNumber AS Telefono,
    s.FaxNumber AS Fax,
    s.WebsiteURL AS SitioWeb,
    s.DeliveryAddressLine1 AS DireccionEntrega,
    s.PostalAddressLine1 AS DireccionPostal,
    dc.CityName AS CiudadEntrega,
    pc.CityName AS CiudadPostal,
    s.DeliveryPostalCode AS CodigoPostal,
    s.BankAccountName AS NombreBanco,
    s.BankAccountBranch AS SucursalBanco,
    s.BankAccountNumber AS NumeroCuenta,
    ISNULL(s.PaymentDays, 0) AS DiasPago,
    CAST(s.DeliveryLocation.Lat AS FLOAT) AS Latitud,
    CAST(s.DeliveryLocation.Long AS FLOAT) AS Longitud
FROM Purchasing.Suppliers s
JOIN Purchasing.SupplierCategories sc 
    ON s.SupplierCategoryID = sc.SupplierCategoryID
JOIN Application.DeliveryMethods dm 
    ON s.DeliveryMethodID = dm.DeliveryMethodID
LEFT JOIN Application.Cities dc ON s.DeliveryCityID = dc.CityID
LEFT JOIN Application.Cities pc ON s.PostalCityID = pc.CityID
LEFT JOIN Application.People p1 ON s.PrimaryContactPersonID = p1.PersonID
LEFT JOIN Application.People p2 ON s.AlternateContactPersonID = p2.PersonID;
GO

-- ==========================================================
-- 03 - vw_Productos
-- ==========================================================
CREATE OR ALTER VIEW vw_Productos AS
SELECT 
    si.StockItemID,
    si.StockItemName AS NombreProducto,
    s.SupplierID AS ProveedorID,
    s.SupplierName AS NombreProveedor,
    c.ColorName AS Color,
    up.PackageTypeName AS UnidadEmpaquetamiento,
    op.PackageTypeName AS Empaquetamiento,
    si.QuantityPerOuter AS CantidadEmpaque,
    si.Brand AS Marca,
    si.Size AS Talla,
    si.TaxRate AS Impuesto,
    si.UnitPrice AS PrecioUnitario,
    si.RecommendedRetailPrice AS PrecioVenta,
    si.TypicalWeightPerUnit AS Peso,
    si.SearchDetails AS PalabrasClave,
    h.QuantityOnHand AS CantidadDisponible,
    h.BinLocation AS Ubicacion
FROM Warehouse.StockItems si
INNER JOIN Purchasing.Suppliers s 
    ON si.SupplierID = s.SupplierID
LEFT JOIN Warehouse.Colors c 
    ON si.ColorID = c.ColorID
LEFT JOIN Warehouse.PackageTypes up 
    ON si.UnitPackageID = up.PackageTypeID
LEFT JOIN Warehouse.PackageTypes op 
    ON si.OuterPackageID = op.PackageTypeID
LEFT JOIN Warehouse.StockItemHoldings h 
    ON si.StockItemID = h.StockItemID;
GO

-- ==========================================================
-- 04 - vw_Ventas
-- ==========================================================
CREATE OR ALTER VIEW vw_Ventas AS
SELECT 
    i.InvoiceID AS NumeroFactura,
    i.InvoiceDate AS FechaFactura,
    c.CustomerName AS Cliente,
    s.StockItemName AS Producto,
    il.Quantity AS Cantidad,
    il.UnitPrice AS PrecioUnitario,
    (il.Quantity * il.UnitPrice) AS Total
FROM Sales.Invoices i
JOIN Sales.InvoiceLines il 
    ON i.InvoiceID = il.InvoiceID
JOIN Sales.Customers c 
    ON i.CustomerID = c.CustomerID
JOIN Warehouse.StockItems s 
    ON il.StockItemID = s.StockItemID;
GO

PRINT '===== VISTAS CREADAS CORRECTAMENTE =====';
GO

-- ==========================================================
-- 05 - sp_ConsultarClientes
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarClientes
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM vw_Clientes;
END;
GO

-- ==========================================================
-- 06 - sp_ConsultarProveedores
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarProveedores
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM vw_Proveedores;
END;
GO

-- ==========================================================
-- 07 - sp_ConsultarProductos
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarProductos
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM vw_Productos;
END;
GO

-- ==========================================================
-- 12 - vw_VentasDetalle 
-- ==========================================================
CREATE OR ALTER VIEW vw_VentasDetalle AS
SELECT
    i.InvoiceID AS NumeroFactura,
    i.InvoiceDate AS FechaFactura,
    c.CustomerName AS Cliente,
    dm.DeliveryMethodName AS MetodoEntrega,
    il.Description AS Producto,
    il.Quantity AS Cantidad,
    il.UnitPrice AS PrecioUnitario,
    il.TaxRate AS ImpuestoAplicado,
    (il.Quantity * il.UnitPrice) AS TotalLinea
FROM Sales.Invoices i
INNER JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
INNER JOIN Sales.Customers c ON i.CustomerID = c.CustomerID
INNER JOIN Application.DeliveryMethods dm ON i.DeliveryMethodID = dm.DeliveryMethodID;
GO

-- ==========================================================
-- 08 - sp_ConsultarVentas
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarVentas
    @NombreCliente NVARCHAR(100) = NULL,
    @FechaInicio DATE = NULL,
    @FechaFin DATE = NULL,
    @MontoMin DECIMAL(18,2) = NULL,
    @MontoMax DECIMAL(18,2) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        NumeroFactura,
        FechaFactura,
        Cliente,
        MetodoEntrega,
        SUM(TotalLinea) AS MontoTotal
    FROM vw_VentasDetalle
    WHERE
        (@NombreCliente IS NULL OR Cliente LIKE '%' + @NombreCliente + '%')
        AND (@FechaInicio IS NULL OR FechaFactura >= @FechaInicio)
        AND (@FechaFin IS NULL OR FechaFactura <= @FechaFin)
        AND (@MontoMin IS NULL OR TotalLinea >= @MontoMin)
        AND (@MontoMax IS NULL OR TotalLinea <= @MontoMax)
    GROUP BY NumeroFactura, FechaFactura, Cliente, MetodoEntrega
    ORDER BY Cliente ASC;
END;
GO

-- ==========================================================
-- 13 - sp_ConsultarDetalleVenta
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarDetalleVenta
    @NumeroFactura INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        NumeroFactura,
        Cliente,
        MetodoEntrega,
        Producto,
        Cantidad,
        PrecioUnitario,
        ImpuestoAplicado,
        (Cantidad * PrecioUnitario) AS TotalLinea
    FROM vw_VentasDetalle
    WHERE NumeroFactura = @NumeroFactura;
END;
GO

PRINT '===== PROCEDIMIENTOS CREADOS CORRECTAMENTE =====';
GO

-- ==========================================================
-- 09 - sp_ConsultarClientePorID
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarClientePorID
    @CustomerID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        C.CustomerID AS IDCliente,
        C.CustomerName AS NombreCliente,
        CC.CustomerCategoryName AS Categoria,
        BG.BuyingGroupName AS GrupoCompra,
        C.PhoneNumber AS Telefono,
        C.FaxNumber AS Fax,
        C.WebsiteURL AS SitioWeb,
        DM.DeliveryMethodName AS MetodoEntrega,
        CT.CityName AS CiudadEntrega,
        C.DeliveryPostalCode AS CodigoPostal,
        C.BillToCustomerID AS ClienteFacturar,
        C.PaymentDays AS DiasPago,
        C.DeliveryAddressLine1 AS DireccionEntrega,
        C.PostalAddressLine1 AS DireccionPostal,
        C.DeliveryLocation.Lat AS Latitud,
        C.DeliveryLocation.Long AS Longitud
    FROM Sales.Customers AS C
    LEFT JOIN Sales.CustomerCategories AS CC ON C.CustomerCategoryID = CC.CustomerCategoryID
    LEFT JOIN Sales.BuyingGroups AS BG ON C.BuyingGroupID = BG.BuyingGroupID
    LEFT JOIN Application.DeliveryMethods AS DM ON C.DeliveryMethodID = DM.DeliveryMethodID
    LEFT JOIN Application.Cities AS CT ON C.DeliveryCityID = CT.CityID
    WHERE C.CustomerID = @CustomerID;
END;
GO

-- ==========================================================
-- 10 - sp_ConsultarProveedorPorID
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarProveedorPorID
    @SupplierID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM vw_Proveedores WHERE SupplierID = @SupplierID;
END;
GO

-- ==========================================================
-- 11 - sp_ConsultarProductoPorID
-- ==========================================================
CREATE OR ALTER PROCEDURE sp_ConsultarProductoPorID
    @StockItemID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM vw_Productos WHERE StockItemID = @StockItemID;
END;
GO

USE WideWorldImporters;
GO

PRINT '===== CREANDO VISTAS Y PROCEDIMIENTOS DE ESTADÍSTICAS =====';
GO


/* ==============================================================
modulo de estadisticas
============================================================== */

/* ==============================================================
1. Estadísticas de compras por proveedor y categoría
============================================================== */
CREATE OR ALTER VIEW vw_EstadisticasCompras AS
SELECT 
    po.SupplierID,
    s.SupplierName AS Proveedor,
    sc.SupplierCategoryName AS Categoria,
    SUM(pol.OrderedOuters * pol.ExpectedUnitPricePerOuter) AS TotalCompra
FROM Purchasing.PurchaseOrders po
JOIN Purchasing.Suppliers s ON po.SupplierID = s.SupplierID
JOIN Purchasing.SupplierCategories sc ON s.SupplierCategoryID = sc.SupplierCategoryID
JOIN Purchasing.PurchaseOrderLines pol ON po.PurchaseOrderID = pol.PurchaseOrderID
GROUP BY ROLLUP (s.SupplierName, sc.SupplierCategoryName, po.SupplierID);
GO

CREATE OR ALTER PROCEDURE sp_EstadisticasCompras
    @Proveedor NVARCHAR(100) = NULL,
    @Categoria NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Proveedor,
        Categoria,
        MAX(TotalCompra) AS CompraMaxima,
        MIN(TotalCompra) AS CompraMinima,
        AVG(TotalCompra) AS PromedioCompras
    FROM vw_EstadisticasCompras
    WHERE
        (@Proveedor IS NULL OR Proveedor LIKE '%' + @Proveedor + '%')
        AND (@Categoria IS NULL OR Categoria LIKE '%' + @Categoria + '%')
    GROUP BY ROLLUP (Proveedor, Categoria)
    ORDER BY Proveedor, Categoria;
END;
GO

/* ==============================================================
2. Estadísticas de ventas por cliente y categoría
============================================================== */
CREATE OR ALTER VIEW vw_EstadisticasVentas AS
SELECT 
    c.CustomerID,
    c.CustomerName AS Cliente,
    cc.CustomerCategoryName AS Categoria,
    SUM(il.Quantity * il.UnitPrice) AS TotalVenta
FROM Sales.Invoices i
JOIN Sales.Customers c ON i.CustomerID = c.CustomerID
JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
JOIN Sales.CustomerCategories cc ON c.CustomerCategoryID = cc.CustomerCategoryID
GROUP BY ROLLUP (c.CustomerName, cc.CustomerCategoryName, c.CustomerID);
GO

CREATE OR ALTER PROCEDURE sp_EstadisticasVentas
    @Cliente NVARCHAR(100) = NULL,
    @Categoria NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Cliente,
        Categoria,
        MAX(TotalVenta) AS VentaMaxima,
        MIN(TotalVenta) AS VentaMinima,
        AVG(TotalVenta) AS PromedioVentas
    FROM vw_EstadisticasVentas
    WHERE
        (@Cliente IS NULL OR Cliente LIKE '%' + @Cliente + '%')
        AND (@Categoria IS NULL OR Categoria LIKE '%' + @Categoria + '%')
    GROUP BY ROLLUP (Cliente, Categoria)
    ORDER BY Cliente, Categoria;
END;
GO

/* ==============================================================
3. Top 5 productos más rentables por año
============================================================== */
CREATE OR ALTER PROCEDURE sp_Top5ProductosPorAnio
    @Anio INT
AS
BEGIN
    SET NOCOUNT ON;

    WITH CTE_Ganancias AS (
        SELECT 
            YEAR(i.InvoiceDate) AS Anio,
            s.StockItemName AS Producto,
            SUM(il.Quantity * (il.UnitPrice - il.TaxRate)) AS GananciaTotal,
            DENSE_RANK() OVER (PARTITION BY YEAR(i.InvoiceDate) ORDER BY SUM(il.Quantity * (il.UnitPrice - il.TaxRate)) DESC) AS RankProducto
        FROM Sales.Invoices i
        JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
        JOIN Warehouse.StockItems s ON il.StockItemID = s.StockItemID
        WHERE YEAR(i.InvoiceDate) = @Anio
        GROUP BY YEAR(i.InvoiceDate), s.StockItemName
    )
    SELECT Anio, Producto, GananciaTotal
    FROM CTE_Ganancias
    WHERE RankProducto <= 5
    ORDER BY GananciaTotal DESC;
END;
GO

/* ==============================================================
4. Top 5 clientes con más facturas por año
============================================================== */
CREATE OR ALTER PROCEDURE sp_Top5ClientesFacturas
    @AnioInicio INT,
    @AnioFin INT
AS
BEGIN
    SET NOCOUNT ON;

    WITH CTE_Facturas AS (
        SELECT 
            YEAR(i.InvoiceDate) AS Anio,
            c.CustomerName AS Cliente,
            COUNT(i.InvoiceID) AS CantFacturas,
            SUM(il.Quantity * il.UnitPrice) AS MontoTotal,
            DENSE_RANK() OVER (PARTITION BY YEAR(i.InvoiceDate) ORDER BY COUNT(i.InvoiceID) DESC) AS RankCliente
        FROM Sales.Invoices i
        JOIN Sales.InvoiceLines il ON i.InvoiceID = il.InvoiceID
        JOIN Sales.Customers c ON i.CustomerID = c.CustomerID
        WHERE YEAR(i.InvoiceDate) BETWEEN @AnioInicio AND @AnioFin
        GROUP BY YEAR(i.InvoiceDate), c.CustomerName
    )
    SELECT Anio, Cliente, CantFacturas, MontoTotal
    FROM CTE_Facturas
    WHERE RankCliente <= 5
    ORDER BY Anio, CantFacturas DESC;
END;
GO

/* ==============================================================
5. Top 5 proveedores con más órdenes de compra por año
============================================================== */
CREATE OR ALTER PROCEDURE sp_Top5ProveedoresCompras
    @AnioInicio INT,
    @AnioFin INT
AS
BEGIN
    SET NOCOUNT ON;

    WITH CTE_Ordenes AS (
        SELECT 
            YEAR(po.OrderDate) AS Anio,
            s.SupplierName AS Proveedor,
            COUNT(po.PurchaseOrderID) AS CantOrdenes,
            SUM(pol.OrderedOuters * si.UnitPrice) AS MontoTotal,
            DENSE_RANK() OVER (PARTITION BY YEAR(po.OrderDate) ORDER BY COUNT(po.PurchaseOrderID) DESC) AS RankProveedor
        FROM Purchasing.PurchaseOrders po
        JOIN Purchasing.Suppliers s ON po.SupplierID = s.SupplierID
        JOIN Purchasing.PurchaseOrderLines pol ON po.PurchaseOrderID = pol.PurchaseOrderID
        JOIN Warehouse.StockItems si ON pol.StockItemID = si.StockItemID
        WHERE YEAR(po.OrderDate) BETWEEN @AnioInicio AND @AnioFin
        GROUP BY YEAR(po.OrderDate), s.SupplierName
    )
    SELECT Anio, Proveedor, CantOrdenes, MontoTotal
    FROM CTE_Ordenes
    WHERE RankProveedor <= 5
    ORDER BY Anio, CantOrdenes DESC;
END;
GO

PRINT '===== ESTADÍSTICAS CREADAS EXITOSAMENTE =====';
GO


PRINT '===== TODAS LAS VISTAS Y PROCEDIMIENTOS FUERON CREADOS EXITOSAMENTE =====';
GO

-- ==========================================================
-- PRUEBAS
-- ==========================================================
PRINT '=== Ejecutando pruebas ===';
EXEC sp_ConsultarClientes;
EXEC sp_ConsultarProveedores;
EXEC sp_ConsultarProductos;
EXEC sp_ConsultarVentas;
EXEC sp_ConsultarClientePorID @CustomerID = 1;
GO
EXEC sp_ConsultarProveedorPorID @SupplierID = 1;