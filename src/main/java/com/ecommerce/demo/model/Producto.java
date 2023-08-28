package com.ecommerce.demo.model;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;

@Entity
@Table (name = "producto")
public class Producto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long codigoEan;
	private String nombreDelProducto;
	private String descripcionDelProducto;
	private String marcaArtesania;
	
	public Producto() {
    }

	public Producto(Long id, Long codigoEan, String nombreDelProducto, String descripcionDelProducto,
			String marcaArtesania) {
		super();
		this.id = id;
		this.codigoEan = codigoEan;
		this.nombreDelProducto = nombreDelProducto;
		this.descripcionDelProducto = descripcionDelProducto;
		this.marcaArtesania = marcaArtesania;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCodigoEan() {
		return codigoEan;
	}
	public void setCodigoEan(Long codigoEan) {
		this.codigoEan = codigoEan;
	}
	public String getNombreDelProducto() {
		return nombreDelProducto;
	}
	public void setNombreDelProducto(String nombreDelProducto) {
		this.nombreDelProducto = nombreDelProducto;
	}
	public String getDescripcionDelProducto() {
		return descripcionDelProducto;
	}
	public void setDescripcionDelProducto(String descripcionDelProducto) {
		this.descripcionDelProducto = descripcionDelProducto;
	}
	public String getMarcaArtesania() {
		return marcaArtesania;
	}
	public void setMarcaArtesania(String marcaArtesania) {
		this.marcaArtesania = marcaArtesania;
	}
	
	
	

	
}
