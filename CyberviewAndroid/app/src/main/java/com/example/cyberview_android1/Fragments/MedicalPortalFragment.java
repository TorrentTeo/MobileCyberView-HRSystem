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

import com.example.cyberview_android1.R;
import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;

import static android.content.Context.MODE_PRIVATE;



public class MedicalPortalFragment extends Fragment {
    TextView medicalPlan;
    ListView medicalLeaveListView, clinicListView, insuranceListView;

    // TODO: Rename parameter arguments, choose names that match

    public MedicalPortalFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);

        View RootView = inflater.inflate(R.layout.fragment_medical_portal, container, false);
        try {
            Gson gson = new Gson();

            String jsonData = myPrefs.getString("LoginModel", "");
            LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
            API requests = new API();

            JSONObject Jobject = requests.getHttpResponse("employee/medicalPlan", obj);
            JSONObject result = Jobject.getJSONObject("results");
            JSONArray medPlan = result.getJSONArray("medicalPlan");

            for (int i = 0; i < medPlan.length(); ++i) {
                JSONObject rec = medPlan.getJSONObject(i);
                String medicalPlanName = rec.getString("medicalPlanName");

                medicalPlan = RootView.findViewById(R.id.medicalPlan);
                medicalPlan.setText("Medical Plan: " + medicalPlanName);
            }

            ArrayList<String> medLeaveList = new ArrayList<String>();

            medicalLeaveListView = RootView.findViewById(R.id.medRecord);

            JSONObject Jobject2 = requests.getHttpResponse("employee/medicalLeave", obj);
            JSONObject result2 = Jobject2.getJSONObject("results");
            JSONArray medLeave = result2.getJSONArray("medicalLeave");

            for (int i = 0; i < medLeave.length(); ++i) {
                JSONObject rec = medLeave.getJSONObject(i);
                String medicalLeave = rec.getString("createdAt");

                medLeaveList.add(medicalLeave);
            }
            final ArrayAdapter<String> adapter = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, medLeaveList);
            medicalLeaveListView.setAdapter(adapter);

            ArrayList<String> clinicList = new ArrayList<String>();

            clinicListView = RootView.findViewById(R.id.clinicList);

            JSONObject Jobject3 = requests.getHttpResponse("employee/clinicList", obj);
            JSONObject result3 = Jobject3.getJSONObject("results");
            JSONArray clinicArray = result3.getJSONArray("clinic");

            for (int i = 0; i < clinicArray.length(); ++i) {
                JSONObject rec = clinicArray.getJSONObject(i);
                String clinic = rec.getString("clinicName");

                clinicList.add(clinic);
            }
            final ArrayAdapter<String> adapter2 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, clinicList);
            clinicListView.setAdapter(adapter2);


            ArrayList<String> insuranceList = new ArrayList<String>();

            insuranceListView = RootView.findViewById(R.id.insuranceList);

            JSONObject Jobject4 = requests.getHttpResponse("employee/insuranceCoverage", obj);
            JSONObject result4 = Jobject4.getJSONObject("results");
            JSONArray insuranceArray = result4.getJSONArray("insurance");

            for (int i = 0; i < insuranceArray.length(); ++i) {
                JSONObject rec = insuranceArray.getJSONObject(i);
                String insurance = rec.getString("typeofInsurance")+" contact: "+rec.getString("contactNumber");

                insuranceList.add(insurance);
            }
            final ArrayAdapter<String> adapter3 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1,insuranceList);
            insuranceListView.setAdapter(adapter3);

        }catch (Exception e){
            Log.i("Error","Failed to connect: "+e.getMessage());
        }

        return RootView;
    }
}
