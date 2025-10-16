-- Examen 1

SELECT codigo_pedido, fecha_pedido, E.nombre, E.apellido1
FROM empleado E JOIN oficina O ON E.codigo_oficina = O.codigo_oficina
    JOIN cliente C ON codigo_empleado = codigo_empleado_rep_ventas
    NATURAL JOIN pedido P
WHERE O.ciudad = 'Madrid';

-- Examen 2

SELECT E.nombre, E.apellido1
FROM empleado JOIN cliente C ON codigo_empleado = codigo_empleado_rep_ventas
NATURAL JOIN pedido P
WHERE E.codigo_empleado NOT IN (
    SELECT E.codigo_empleado
    FROM empleado JOIN cliente C ON codigo_empleado = codigo_empleado_rep_ventas
    NATURAL JOIN pedido P
    WHERE estado = 'pendiente')

-- Examen 3

SELECT ciudad, COUNT(*) as Cantidad
FROM cliente
GROUP BY ciudad
HAVING COUNT(*) > 5;

-- Examen 4

SELECT C.codigo_cliente, C.nombre_contacto, C.apellido_contacto
FROM 
    cliente C NATURAL JOIN pago P
    NATURAL JOIN pedido PP
WHERE 
    PP.codigo_cliente NOT IN (
        SELECT codigo_cliente
        FROM pago
        WHERE forma_pago <> 'contado'
    ) AND 
    BETWEEN (DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR) AND CURRENT_DATE)
GROUP BY codigo_cliente, nombre_contacto, apellido_contacto
HAVING COUNT(codigo_pedido) > 4;

-- Examen 5

SELECT * 
FROM producto
WHERE catidad_en_stock < (
    SELECT AVG(cantidad_en_stock)
    FROM producto
);

-- Examen 6

SELECT E.nombre, E.apellido1, J.nombre, J.apellido1
FROM empleado E JOIN empleado J ON E.codigo_empleado = J.codigo_jefe
WHERE E.codigo_oficina = J.codigo_oficina;

-- Examen 7

SELECT codigo_pedido
FROM pedido P NATURAL JOIN detalle_pedido D
    NATURAL JOIN producto PR
GROUP BY codigo_pedido
HAVING COUNT(DISTICT PR.gama) = (
    SELECT COUNT(gama)
    FROM gama_producto
);


-- Recuperatorio 1

SELECT codigo_pedido, nombre_cliente, COUNT(DISTINCT DP.codigo_producto), SUM(cantidad), SUM(cantidad * precio_venta)
FROM cliente NATURAL JOIN pedido
    NATURAL JOIN detalle_pedido DP
    NATURAL JOIN producto
GROUP BY codigo_pedido, nombre_cliente;

-- Recuperatorio 2

SELECT nombre, apellido1 
FROM empleado JOIN cliente ON codigo_empleado = codigo_empleado_rep_venta
    NATURAL JOIN pedido
GROUP BY nombre, apellido1
HAVING COUNT(codigo_pedido) < AVG(
    SELECT COUNT(codigo_pedido)
    FROM empleado JOIN cliente ON codigo_empleado = codigo_empleado_rep_venta
    NATURAL JOIN pedido
    GROUP BY 
); --raro

-- Recuperatorio 3

SELECT E.nombre, E.apellido1, OE.ciudad, J.nombre, J.apellido1, OJ.ciudad
FROM empleado E JOIN empleado J ON E.codigo_jefe = J.codigo_empleado
    JOIN oficina OE ON E.codigo_oficina = OE.codigo_oficina
    JOIN oficina OJ ON J.codigo_oficina = OJ.codigo_oficina;

-- Recuperatorio 4

SELECT codigo_cliente, nombre_cliente, apellido_contacto
FROM cliente C JOIN empleado E ON codigo_empleado = codigo_empleado_rep_venta
    NATURAL JOIN oficina O
    NATURAL JOIN detalle_pedido DP
    NATURAL JOIN producto p
WHERE 
    O.ciudad IN (
        SELECT ciudad
        FROM oficina
        GROUP BY ciudad
        HAVING COUNT(codigo_oficina) > 1
    ) AND 
    YEAR(fecha_pedido) = YEAR(CURRENT_DATE);
GROUP BY codigo_cliente, nombre_cliente, apellido_contacto
HAVING COUNT(DISTINCT DP.codigo_producto) > 10;

-- Recuperatorio 5

SELECT P.codigo_producto
FROM producto P NATURAL JOIN detalle_pedido
    NATURAL JOIN pedido
WHERE
    P.codigo_producto NOT IN (
    SELECT P.codigo_producto
    FROM producto P NATURAL JOIN detalle_pedido
    NATURAL JOIN pedido
    WHERE fecha_pedido > DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)
) AND
    P.codigo_producto IN (
        SELECT codigo_producto
        FROM producto P NATURAL JOIN detalle_pedido
        NATURAL JOIN pedido
        GROUP BY codigo_producto, YEAR(fecha_pedido)
        HAVING COUNT(codigo_pedido) > 200
    )
GROUP BY P.codigo_producto;