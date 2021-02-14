package com.example.cyberview_android1.models;

import java.util.Date;

public class UserModel {
    private String id;
    private String name;
    private String email;
    private String role;


    private String emergencyContact;
    private Date joinedDate;
    private String contact;


    public UserModel() {
    }

    public UserModel(String id, String name, String email, String role,String emergencyContact,String contact, Date joinedDate ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.emergencyContact = emergencyContact;
        this.joinedDate = joinedDate;
        this.contact = contact;
    }

    public Date getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(Date joinedDate) {
        this.joinedDate = joinedDate;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
