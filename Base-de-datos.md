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