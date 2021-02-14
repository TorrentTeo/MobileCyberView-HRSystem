package com.example.cyberview_android1;

import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.gson.Gson;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;

import static android.content.Context.MODE_PRIVATE;


public class HomeFragment extends Fragment {
    ListView listview;
    ListView listview2;
    TextView userNameText;

    public HomeFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);

        View RootView = inflater.inflate(R.layout.fragment_home, container, false);
        try {
            Gson gson = new Gson();
            String jsonData = myPrefs.getString("LoginModel", "");
            LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
            API requests = new API();

            userNameText = RootView.findViewById(R.id.userName);
            userNameText.setText(obj.getUser().getName());

            JSONObject Jobject = requests.getHttpResponse("employee/feed", obj);
            JSONObject result = Jobject.getJSONObject("results");
            JSONObject feed = result.getJSONObject("feed");
            Iterator<String> keys = feed.keys();
            ArrayList<String> announcementsList = new ArrayList<String>();
            ArrayList<String> companyNewsList = new ArrayList<String>();
            while(keys.hasNext()) {
                String key = keys.next();
                if (feed.get(key) instanceof JSONObject) {
                    JSONObject feedItem = feed.getJSONObject(key);
                    if(feedItem.getString("feedType").equals("Announcement")){
                        announcementsList.add(feedItem.getString("content"));
                    }else{
                        companyNewsList.add(feedItem.getString("content"));
                    }
                }
            }
            listview = (ListView) RootView.findViewById(R.id.listView1);
            final ArrayAdapter<String> adapter = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, announcementsList);
            listview.setAdapter(adapter);
            listview2 = (ListView) RootView.findViewById(R.id.listView2);
            final ArrayAdapter<String> adapter2 = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, companyNewsList);
            listview2.setAdapter(adapter2);
        }catch (Exception e){
            Log.i("Error","Failed to connect: "+e.getMessage());
        }

        return RootView;
    }
}