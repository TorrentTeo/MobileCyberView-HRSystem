package com.example.cyberview_android1;


import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.os.StrictMode;
import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.example.cyberview_android1.models.UserModel;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;


public class Login extends AppCompatActivity {

    public static final String mypreference = "mypref";
    SharedPreferences sharedpreferences;
    Button loginButton;
    EditText emailText;
    EditText passwordText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        if (android.os.Build.VERSION.SDK_INT > 9)
        {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }
        loginButton = (Button)findViewById(R.id.btn2);
        sharedpreferences = this.getSharedPreferences("myPrefs", MODE_PRIVATE);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                emailText = (EditText)findViewById(R.id.emailEdt);
                passwordText = (EditText)findViewById(R.id.passEdt);

                String email = emailText.getText().toString();
                String pass = passwordText.getText().toString();
                HashMap<String, String > params = new HashMap<>();
                params.put("email", email);
                params.put("password", pass);
                try {
                    API requests = new API();
                    JSONObject res = requests.postLoginRequest("auth/login", params);
                    boolean error = res.getBoolean("error");
                    if(error){

                    }else{
                        UserModel userModel = new UserModel();
                        LoginModel loginModel = new LoginModel();

                        JSONObject result = res.getJSONObject("results");
                        JSONObject user = result.getJSONObject("user");
                        String token = result.getString("token");

                        loginModel.setToken(token);

                        userModel.setEmail(user.getString("email"));
                        userModel.setName(user.getString("name"));
                        userModel.setId(user.getString("id"));
                        userModel.setRole(user.getString("role"));
                        userModel.setEmergencyContact(user.getString("emergencyContact"));
                        userModel.setContact(user.getString("contact"));

                        String date = user.getString("joinedDate");
                        DateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                        Date date1 = iso8601.parse(date);;

                        userModel.setJoinedDate(date1);

                        loginModel.setUser(userModel);


                        SharedPreferences.Editor editor = sharedpreferences.edit();

                        Gson gson = new Gson();
                        String json = gson.toJson(loginModel);

                        editor.putString("LoginModel", json);
                        editor.commit();

                        Intent goToNextActivity = new Intent(getApplicationContext(), Home.class);
                        startActivity(goToNextActivity);
                    }
                }catch (JSONException exception) {
                    Log.d("JSONException", "Json exception catched :".concat(exception.getMessage()));
                }catch (IOException e) {
                    e.printStackTrace();
                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }
}
