-- Consulta 1

SELECT FirstName 
FROM Employees 
WHERE EmployeeID = 5;

-- Consulta 2

SELECT * 
FROM Customers
WHERE Country = 'Mexico';

-- Consulta 3

SELECT O.OrderID, O.OrderDate 
FROM Orders O, OrderDetails OD
WHERE O.OrderID = OD.OrderID AND
O.EmployeeID = 5;

-- Consulta 4

SELECT DISTINCT S.SupplierID, S.ContactName 
FROM Suppliers S, Products P, Categories C
WHERE S.SupplierID = P.SupplierID AND P.CategoryID = C.CategoryID AND
C.CategoryName = 'Condiments';

-- Consulta 5

SELECT DISTINCT C.CategoryID, C.CategoryName 
FROM Products P, Categories C
WHERE P.CategoryID = C.CategoryID AND
P.SupplierID = 14;

-- Consulta 6

SELECT E.FirstName, O.OrderID, O.OrderDate, P.ProductName
FROM Employees E, Orders O, Products P, OrderDetails OD
WHERE E.EmployeeID = O.EmployeeID AND O.OrderID = OD.OrderID AND OD.ProductID = P.ProductID AND 
E.EmployeeID = 5 AND P.ProductID;

-- Consulta 7

SELECT O.OrderID, P.ProductName  
FROM Products P, Orders O, OrderDetails OD
WHERE O.OrderID = OD.OrderID AND OD.ProductID = P.ProductID AND
O.EmployeeID = 5;

-- Consulta 8

SELECT O.OrderID, O.OrderDate, C.ContactName, P.ProductName
FROM Orders O, Customers C, Suppliers S, OrderDetails OD, Products P
WHERE C.CustomerID = O.CustomerID AND O.OrderID = OD.OrderID AND P.ProductID = OD.ProductID AND P.SupplierID = S.SupplierID AND
C.Country = S.Country;

-- Consulta 9

SELECT O.OrderID, P.ProductID, P.ProductName, P.Price, OD.Quantity, P.Price * OD.Quantity AS Subtotal
FROM Orders O, OrderDetails OD, Products P, Categories C
WHERE O.OrderID = OD.OrderID AND OD.ProductID = P.ProductID AND P.CategoryID = C.CategoryID AND
C.CategoryID = 3;

-- Consulta 10

SELECT O.OrderID, O.OrderDate, E.FirstName, C.ContactName
FROM Orders O, Customers C, Employees E
WHERE E.EmployeeID = O.EmployeeID AND O.CustomerID = C.CustomerID AND
O.OrderDate BETWEEN #1/1/1997# AND #12/31/1997#; --EN ESTE MOTOR LA FORMA DE COMPARAR FECHAS ES CON '#'

-- Consulta 11

SELECT O.OrderID, O.OrderDate, E.FirstName, C.ContactName
FROM Orders O, Customers C, Employees E
WHERE E.EmployeeID = O.EmployeeID AND O.CustomerID = C.CustomerID AND
O.OrderDate BETWEEN #1/1/2025# AND #12/31/2025#;  --EN ESTE MOTOR LA FORMA DE COMPARAR FECHAS ES CON '#'

-- Consulta 13

SELECT C.CategoryID, C.CategoryName, SUM(OD.Quantity) AS Ventas, SUM(OD.Quantity * P.Price) AS Ganancia
FROM Categories C, Products P, OrderDetails OD
WHERE C.CategoryID = P.CategoryID AND P.ProductID = OD.ProductID
GROUP BY C.CategoryID, C.CategoryName;

-- Consulta 15

SELECT C.CategoryID, C.CategoryName, SUM(OD.Quantity) AS Ventas, SUM(OD.Quantity * P.Price) AS Ganancia, MIN(OD.Quantity * P.Price) AS Minimo, MAX(OD.Quantity * P.Price) AS Maximo
FROM Categories C, Products P, OrderDetails OD
WHERE C.CategoryID = P.CategoryID AND P.ProductID = OD.ProductID
GROUP BY C.CategoryID, C.CategoryName;

-- Consulta 16

-- Listar empleados con sus respectivos promedios de ventas. Mostrar Id, nombre de empleado y promedio de importe en ventas.

SELECT E.EmployeeID, E.FirstName, AVG(P.Price * OD.Quantity) 
FROM Employees E NATURAL JOIN Orders O
NATURAL JOIN OrderDetails OD
NATURAL JOIN Products P
GROUP BY E.EmployeeID, E.FirstName;

-- Consulta 17

-- Listar empleados con sus respectivas cantidades de ventas. Mostrar Id, nombre de empleado y cantidad de ventas.

SELECT E.EmployeeID, E.FirstName, COUNT(O.OrderID) 
FROM Employees E NATURAL JOIN Orders O
GROUP BY E.EmployeeID, E.FirstName

-- Consulta 18

-- Cuál es el empleado que ha participado de una mayor cantidad de ventas? Mostrar Nombre de empleado y cantidad de ventas

SELECT E.FirstName, E.LastName, COUNT(O.OrderID) AS ventas
FROM Employees E NATURAL JOIN Orders O
GROUP BY E.EmployeeID, E.FirstName
ORDER BY ventas DESC
LIMIT 1;

-- Consulta 20

SELECT DISTINCT ProductName
FROM products
WHERE ProductID NOT IN (
	SELECT ProductID
    FROM order_details NATURAL JOIN orders
    WHERE YEAR(OrderDate) = 1996
)

-- Consulta 21



-- 1000 FORMAS DE RESOLVER UN EJ

-- Consulta B

SELECT C.CodigoCliente, C.Empresa
FROM Clientes C 
WHERE C.CodigoCliente NOT IN (
    SELECT P.CodigoCliente
    FROM Pedidos P
    WHERE YEAR(FechaPedido) = YEAR(CURRENT_DATE)
);

-- Consulta C


SELECT P.CodigoArticulo, P.NombreArticulo, P.PaisDeOrigen
FROM Clientes C NATURAL JOIN Pedidos Pe
    NATURAL JOIN ProductosPedidos PP
    NATURAL JOIN Productos P
WHERE C.Poblacion = 'Madrid' AND
    P.Rubro = 'Ferreteria'
ORDER BY P.PaisDeOrigen;