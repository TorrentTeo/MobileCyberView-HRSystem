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


public class RewardFragment extends Fragment {

    ListView rewardListView;
    TextView balanceText;
    public RewardFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View RootView = inflater.inflate(R.layout.fragment_reward, container, false);
        // Inflate the layout for this fragment

        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);
        try {
            Gson gson = new Gson();
            String jsonData = myPrefs.getString("LoginModel", "");
            LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
            API requests = new API();

            JSONObject Jobject = requests.getHttpResponse("employee/reward", obj);
            JSONObject result = Jobject.getJSONObject("results");
            JSONObject reward = result.getJSONObject("reward");

            ArrayList<String> rewardList = new ArrayList<String>();

            Iterator<String> keys = reward.keys();

            while(keys.hasNext()) {
                String key = keys.next();
                if (reward.get(key) instanceof JSONObject) {
                    JSONObject rewardItem = reward.getJSONObject(key);
                    rewardList.add(rewardItem.getString("name"));
                }
            }

            rewardListView = (ListView) RootView.findViewById(R.id.rewards);
            final ArrayAdapter<String> adapter = new ArrayAdapter
                    (getActivity(), android.R.layout.simple_list_item_1, rewardList);
            rewardListView.setAdapter(adapter);

            JSONObject Jobject2 = requests.getHttpResponse("employee/wallet", obj);
            JSONObject result2 = Jobject2.getJSONObject("results");
            JSONArray wallet = result2.getJSONArray("wallet");

            int point = 0;
            for (int i = 0; i < wallet.length(); ++i) {
                JSONObject rec = wallet.getJSONObject(i);
                point = rec.getInt("point");
            }
            balanceText = (TextView) RootView.findViewById(R.id.balance);
            balanceText.setText("Balance: " + point);
        }catch (Exception e){
            Log.i("Error","Failed to connect: "+e.getMessage());
        }
        return RootView;
    }
}