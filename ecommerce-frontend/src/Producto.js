import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form, Navbar, Table } from "react-bootstrap";
import './styles.css';


export default function Producto() {
  const [editingProducto, setEditingProducto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [newProducto, setNewProducto] = useState({
    codigoEan: "",
    nombreDelProducto: "",
    descripcionDelProducto: "",
    marcaArtesania: "", unidadesDisponibles: "",
    imagenProducto: ""


  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/producto/")
      .then(response => setProductos(response.data))
      .catch(error => console.log(error));
  }, []);

  const addProducto = () => {
    axios.post("http://localhost:8080/api/producto/", newProducto)
      .then(() => {
        // Actualizar los productos desde el backend
        axios.get("http://localhost:8080/api/producto/")
          .then(response => setProductos(response.data))
          .catch(error => console.log(error));

        setNewProducto({
          codigoEan: "",
          nombreDelProducto: "",
          descripcionDelProducto: "",
          marcaArtesania: "",
        });
      })
      .catch(error => console.log(error));
  };

  const deleteProducto = (id) => {
    axios.delete(`http://localhost:8080/api/producto/${id}`)
      .then(() => {
        setProductos(productos.filter(producto => producto.id !== id));
      })
      .catch(error => console.log(error));
  };
  const updateProducto = (id, updatedProducto) => {
    axios.put(`http://localhost:8080/api/producto/${id}`, updatedProducto)
      .then(response => {
        setProductos(productos.map(producto =>
          producto.id === id ? response.data : producto
        ));
        setEditingProducto(null);  // Cerrar el formulario de edición
      })
      .catch(error => console.log(error));
  };



  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Productos</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cerrar' : 'Agregar Producto'}
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Row>
      {showAddForm && (
        <Col>
          <h1 className="custom-title">Productos</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Código EAN"
                value={newProducto.codigoEan}
                onChange={(e) => setNewProducto({ ...newProducto, codigoEan: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre del Producto"
                value={newProducto.nombreDelProducto}
                onChange={(e) => setNewProducto({ ...newProducto, nombreDelProducto: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Descripción del Producto"
                value={newProducto.descripcionDelProducto}
                onChange={(e) => setNewProducto({ ...newProducto, descripcionDelProducto: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Marca"
                value={newProducto.marcaArtesania}
                onChange={(e) => setNewProducto({ ...newProducto, marcaArtesania: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Unidades Disponibles"
                value={newProducto.unidadesDisponibles}
                onChange={(e) => setNewProducto({ ...newProducto, unidadesDisponibles: e.target.value })}
              />
            </Form.Group>
            <Button className="custom-button" onClick={addProducto}>
              Agregar Producto
            </Button>
          </Form>
        </Col>
        )}
        <Table striped bordered hover className="mt-3">
        <Col>
          {/* Añadir la tabla aquí */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Código EAN</th>
                <th scope="col">Marca</th>
                <th scope="col">U. Disponibles</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <>
                  <tr key={index}>
                    <td>{producto.nombreDelProducto}</td>
                    <td>{producto.descripcionDelProducto}</td>
                    <td>{producto.codigoEan}</td>
                    <td>{producto.marcaArtesania}</td>
                    <td>{producto.unidadesDisponibles}</td>
                    <td>
                      <Button variant="info" onClick={() => setEditingProducto(producto)}>Editar</Button>
                      <Button variant="danger" onClick={() => deleteProducto(producto.id)}>Eliminar</Button>
                    </td>
                  </tr>
                  {editingProducto?.id === producto.id && (
                    <tr>
                      <td colSpan="6">
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                              type="text"
                              value={editingProducto.nombreDelProducto}
                              onChange={e => setEditingProducto({ ...editingProducto, nombreDelProducto: e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Código EAN</Form.Label>
                            <Form.Control
                              type="number"
                              value={editingProducto.codigoEan}
                              onChange={e => setEditingProducto({ ...editingProducto, codigoEan: e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Descripción del Producto</Form.Label>
                            <Form.Control
                              type="text"
                              value={editingProducto.descripcionDelProducto}
                              onChange={e => setEditingProducto({ ...editingProducto, descripcionDelProducto: e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                              type="text"
                              value={editingProducto.marcaArtesania}
                              onChange={e => setEditingProducto({ ...editingProducto, marcaArtesania: e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>U.Disponibles</Form.Label>
                            <Form.Control
                              type="number"
                              value={editingProducto.unidadesDisponibles}
                              onChange={e => setEditingProducto({ ...editingProducto, unidadesDisponibles: e.target.value })}
                            />
                          </Form.Group>
                          <Button variant="success" onClick={() => updateProducto(producto.id, editingProducto)}>Guardar Cambios</Button>
                          <Button variant="secondary" onClick={() => setEditingProducto(null)}>Cancelar</Button>
                        </Form>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </Col>
        </Table>

      </Row>
    </Container>
  );


}

