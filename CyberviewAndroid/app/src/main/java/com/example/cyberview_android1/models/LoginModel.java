package com.example.cyberview_android1.models;

public class LoginModel {
    private String Token;
    private UserModel user;

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
