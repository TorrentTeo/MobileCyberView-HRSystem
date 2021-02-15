package com.example.cyberview_android1.Fragments;

import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.provider.DocumentsContract;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.example.cyberview_android1.R;
import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.gson.Gson;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import static android.content.Context.MODE_PRIVATE;


public class ProfileFragment extends Fragment {

    ListView listView3;
    ListView listView4;
    ListView listView5;
    ListView listView6;
    ListView listView7;
    TextView achievementText;
    TextView trainingText;
    TextView skillsText;
    TextView eduText;
    TextView reviewsText;


    public ProfileFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);
        View RootView = inflater.inflate(R.layout.fragment_profile, container, false);

        try {
            Gson gson = new Gson();
            String jsonData = myPrefs.getString("LoginModel", "");
            LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
            API requests = new API();

            achievementText = RootView.findViewById(R.id.textView6);
            trainingText = RootView.findViewById(R.id.textView7);
            skillsText = RootView.findViewById(R.id.textView8);
            eduText = RootView.findViewById(R.id.textView9);
            reviewsText = RootView.findViewById(R.id.textView10);

            JSONObject Jobject = requests.getHttpResponse("employee/profile", obj);
            JSONObject result = Jobject.getJSONObject("results");
            JSONArray profile = result.getJSONArray("profile");
//            Iterator<String> keys = profile.keys();
            ArrayList<String> achievementList = new ArrayList<String>();
            ArrayList<String> trainingList = new ArrayList<String>();
            ArrayList<String> skillsList = new ArrayList<String>();
            ArrayList<String> eduList = new ArrayList<String>();
            ArrayList<String> reviewsList = new ArrayList<String>();

            for (int i = 0; i < profile.length(); ++i) {
                JSONObject rec = profile.getJSONObject(i);
                rec.getString("category");
                String cat = rec.getString("category");
                String desc = rec.getString("description");
                if (cat.equals("Achievement")) {
                    achievementList.add(desc);
                } else if (cat.equals("Training")) {
                    trainingList.add(desc);
                } else if (cat.equals("Skills")) {
                    skillsList.add(desc);

                }else if (cat.equals("Education")) {
                    eduList.add(desc);
                } else if (cat.equals("Review")) {
                    reviewsList.add(desc);
                }

            }


            listView3 = (ListView) RootView.findViewById(R.id.listView3);
            final ArrayAdapter<String> adapter3 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, achievementList);
            listView3.setAdapter(adapter3);

            listView4 = (ListView) RootView.findViewById(R.id.listView4);
            final ArrayAdapter<String> adapter4 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, trainingList);
            listView4.setAdapter(adapter4);

            listView5 = (ListView) RootView.findViewById(R.id.listView5);
            final ArrayAdapter<String> adapter5 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, skillsList);
            listView5.setAdapter(adapter5);

            listView6 = (ListView) RootView.findViewById(R.id.listView6);
            final ArrayAdapter<String> adapter6 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, eduList);
            listView6.setAdapter(adapter6);

            listView7 = (ListView) RootView.findViewById(R.id.listView7);
            final ArrayAdapter<String> adapter7 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, reviewsList);
            listView7.setAdapter(adapter7);


            Button btn1 = RootView.findViewById(R.id.addBtn1);

            btn1.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Gson gson = new Gson();
                    String jsonData = myPrefs.getString("LoginModel", "");
                    LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
                    API requests = new API();



                }
            });

            listView3.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                    Gson gson = new Gson();
                    String jsonData = myPrefs.getString("LoginModel", "");
                    LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
                    API requests = new API();





                }
            });


        } catch (Exception e) {
            Log.i("Error","Failed to connect: "+e.getMessage());

        }


        // Inflate the layout for this fragment
        return RootView;
    }
}