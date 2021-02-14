package com.example.cyberview_android1;


import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;


public class Login extends AppCompatActivity {

    Button loginButton;
    EditText email, password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        email = (EditText)findViewById(R.id.emailEdt);
        password = (EditText)findViewById(R.id.passEdt);
        loginButton = (Button)findViewById(R.id.btn2);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(email.getText().toString().equals("admin") && password.getText().toString().equals("admin"))
                {
                    Intent intent = new Intent(Login.this, Home.class);
                    startActivity(intent);
                    Toast.makeText(Login.this, "Username and Password is correct", Toast.LENGTH_SHORT).show();
                }
                else{
                    Toast.makeText(Login.this, "Username or Password is incorrect", Toast.LENGTH_SHORT).show();

                }
            }
        });

    }
}
