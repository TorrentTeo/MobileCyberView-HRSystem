package com.example.cyberview_android1.Fragments;

import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.gson.Gson;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;

import static android.content.Context.MODE_PRIVATE;

import com.example.cyberview_android1.R;


public class ManageFragment extends Fragment {
    TextView userNameText;
    TextView userPhoneText;
    TextView userEmailText;
    TextView userEmergencyContactText;
    TextView userJoinedDateText;



    public ManageFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);

        View RootView = inflater.inflate(R.layout.fragment_manage, container, false);
        try {
            Gson gson = new Gson();
            String jsonData = myPrefs.getString("LoginModel", "");
            LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
            userNameText = RootView.findViewById(R.id.userName);
            userPhoneText = RootView.findViewById(R.id.userPhone);
            userEmailText = RootView.findViewById(R.id.userEmail);
            userEmergencyContactText = RootView.findViewById(R.id.userEmergencyContact);
            userJoinedDateText = RootView.findViewById(R.id.userJoinedDate);

            userNameText.setText("Name: " + obj.getUser().getName());
            userPhoneText.setText("Phone:  " + obj.getUser().getContact());
            userEmailText.setText("Email:  " + obj.getUser().getEmail());
            userEmergencyContactText.setText("Emergency Contact:  " + obj.getUser().getEmergencyContact());
            userJoinedDateText.setText("Joined Date:  " + obj.getUser().getJoinedDate().toString());

        }catch (Exception e){
            Log.i("Error","Failed to connect: "+e.getMessage());
        }

        return RootView;
    }
}