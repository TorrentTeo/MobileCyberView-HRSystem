package com.example.cyberview_android1.Fragments;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import com.example.cyberview_android1.Login;
import com.example.cyberview_android1.R;
import com.example.cyberview_android1.StartPage;
import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TimeZone;

import static android.content.Context.MODE_PRIVATE;


public class CalendarFragment<applyLeave> extends Fragment {
    long selectedDate;
    SharedPreferences myPrefs;
    ListView activitiesListView;
    TextView textView8, textView9;
    Activity context;



    public CalendarFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);
        context=getActivity();
        View RootView =  inflater.inflate(R.layout.fragment_calendar, container, false);
        CalendarView simpleCalendarView = (CalendarView) RootView.findViewById(R.id.simpleCalendarView); // get the reference of CalendarView
        selectedDate = simpleCalendarView.getDate();
        Gson gson = new Gson();
        String jsonData = myPrefs.getString("LoginModel", "");
        LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
        API requests = new API();




        try {

            JSONObject Jobject2 = requests.getHttpResponse("employee/leavedays", obj);
            JSONObject result2 = Jobject2.getJSONObject("results");
            JSONObject leaveDays = result2.getJSONObject("leave");
            Iterator<String> keys = leaveDays.keys();
            String leave = "";
            String expiry = "";
            while(keys.hasNext()) {
                String key = keys.next();
                if (leaveDays.get(key) instanceof JSONObject) {
                    JSONObject leaveItem = leaveDays.getJSONObject(key);

                    leave = "Remaining Leave: " + leaveItem.getString("numberOfLeaves");
                    expiry = "expiring at "+ leaveItem.getString("expiryDate");
                }
            }
            String res = expiry.substring(0, expiry.indexOf("T00"));
            textView8 = RootView.findViewById(R.id.textView8);
            textView9 = RootView.findViewById(R.id.textView9);
            textView8.setText(leave);
            textView9.setText(res);

            ArrayList<String> activitiesList = new ArrayList<String>();

            JSONObject result = GetActivites();
            JSONArray events = result.getJSONArray("events");
            activitiesListView  = (ListView) RootView.findViewById(R.id.activities);
            int point = 0;
            for (int i = 0; i < events.length(); ++i) {
                JSONObject rec = events.getJSONObject(i);
                activitiesList.add(rec.getString("activity"));
            }
            final ArrayAdapter<String> adapter = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, activitiesList);
            activitiesListView.setAdapter(adapter);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }


        simpleCalendarView.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(CalendarView view, int year, int month, int dayOfMonth) {
                selectedDate = simpleCalendarView.getDate();
                try {
                    ArrayList<String> activitiesList = new ArrayList<String>();

                    JSONObject result = GetActivites();
                    JSONArray events = result.getJSONArray("events");
                    activitiesListView  = (ListView) RootView.findViewById(R.id.activities);
                    int point = 0;
                    for (int i = 0; i < events.length(); ++i) {
                        JSONObject rec = events.getJSONObject(i);
                        activitiesList.add(rec.getString("activity"));
                    }
                    final ArrayAdapter<String> adapter = new ArrayAdapter
                            (getActivity(), android.R.layout.simple_list_item_1, activitiesList);
                    activitiesListView.setAdapter(adapter);
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        // Inflate the layout for this fragment
        return RootView;
    }
    public JSONObject GetActivites() throws IOException, JSONException {
        SimpleDateFormat sdf = new SimpleDateFormat();
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        String date = new Date(selectedDate).toInstant().toString();

        Gson gson = new Gson();
        String jsonData = myPrefs.getString("LoginModel", "");
        LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
        API requests = new API();
        HashMap<String, String > params = new HashMap<>();
        params.put("date", date);

        try {
            JSONObject Jobject = requests.postRequest("employee/getcalendar", params ,obj);
            JSONObject result = Jobject.getJSONObject("results");
            return result;
        } catch (IOException | JSONException e) {
            e.printStackTrace();
            throw e;
        }
    }
    public void onStart(){
        super.onStart();
        Button bt=(Button)context.findViewById(R.id.applyLeave);
        Button bt2=(Button)context.findViewById(R.id.medicalLeaveHistory);
        bt.setOnClickListener(new View.OnClickListener(){
            public void onClick(View view){
                Intent intent=new Intent(context, apply_leave.class);
                startActivity(intent);
            }

        }
        );
        bt2.setOnClickListener(new View.OnClickListener(){
            public void onClick(View view){
                Intent intent=new Intent(context, medicalleave_history.class);
                startActivity(intent);
            }

        }
        );
    }
}
