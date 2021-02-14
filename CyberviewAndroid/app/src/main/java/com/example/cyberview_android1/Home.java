package com.example.cyberview_android1;

import android.content.SharedPreferences;
import android.os.Bundle;

import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.navigation.NavigationView;
import com.google.android.material.snackbar.Snackbar;
import com.google.gson.Gson;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;

import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;

public class Home extends AppCompatActivity {

    //variables
    DrawerLayout drawerLayout;
    NavigationView navigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        drawerLayout = findViewById(R.id.drawerLayout);

        findViewById(R.id.menuIcon).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                drawerLayout.openDrawer(GravityCompat.START);
            }
        });

            navigationView = findViewById(R.id.nav_view);
            navigationView.setItemIconTintList(null);

        NavController navController = Navigation.findNavController(this,R.id.navHostFrag);
        NavigationUI.setupWithNavController(navigationView, navController);

    }
}