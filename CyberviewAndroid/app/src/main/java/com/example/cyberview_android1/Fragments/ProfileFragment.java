package com.example.cyberview_android1.Fragments;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.cyberview_android1.R;
import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

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


           

        } catch (Exception e) {
            Log.i("Error","Failed to connect: "+e.getMessage());

        }
        Button btn1 = RootView.findViewById(R.id.addBtn1);

        btn1.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onClick(View view) {

                AlertDialog.Builder alert = new AlertDialog.Builder(getContext());
                alert.setView(R.layout.add_fragment);
                alert.setTitle("Add");
                alert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                    }
                });
                alert.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Gson gson = new Gson();
                        String loginModel = myPrefs.getString("LoginModel", "");
                        LoginModel loginModel1 = gson.fromJson(loginModel, LoginModel.class);
                        API requests = new API();
                        //Category



                        //Description
                        EditText addAchievement = (EditText) RootView.findViewById(R.id.add_box);
//                            addTraining = (EditText) RootView.findViewById(R.id.addTraining);
//                            addSkills = (EditText) RootView.findViewById(R.id.addSkills);
//                            addEdu = (EditText) RootView.findViewById(R.id.addEdu);
//                            addReviews = (EditText) RootView.findViewById(R.id.addReviews);
                        String achievement = addAchievement.getText().toString();
//                            String training = addTraining.getText().toString();
//                            String skills = addSkills.getText().toString();
//                            String edu = addEdu.getText().toString();
//                            String reviews = addReviews.getText().toString();
                        HashMap<String, String> params = new HashMap<>();
//                            String desc;

                        try {
                            params.put("description", achievement);


                            JSONObject res = requests.postRequest("employee/profile",params,loginModel1);
                            boolean error = res.getBoolean("error");

                            if (error) {
                                new AlertDialog.Builder(getContext())
                                        .setTitle("OOPS")
                                        .setMessage("Something went wrong please try again, if the problem persists contact the admin")
                                        .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                                            public void onClick(DialogInterface dialog, int which) {
                                                // Continue with delete operation
                                            }
                                        })
                                        // A null listener allows the button to dismiss the dialog and take no further action.
                                        .setNegativeButton(android.R.string.no, null)
                                        .setIcon(android.R.drawable.ic_dialog_alert)
                                        .show();
                            } else {
                                new AlertDialog.Builder(getContext())
                                        .setTitle("Success")
                                        .setMessage("Contract Submitted Successfully")

                                        // Specifying a listener allows you to take an action before dismissing the dialog.
                                        // The dialog is automatically dismissed when a dialog button is clicked.
                                        .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                                            public void onClick(DialogInterface dialog, int which) {
                                                // Continue with delete operation
                                            }
                                        })
                                        // A null listener allows the button to dismiss the dialog and take no further action.
                                        .setNegativeButton(android.R.string.no, null)
                                        .setIcon(android.R.drawable.ic_dialog_alert)
                                        .show();
                            }


                        } catch (JSONException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                    }
                });

                alert.show();




            }
        });


        // Inflate the layout for this fragment
        return RootView;
    }
}