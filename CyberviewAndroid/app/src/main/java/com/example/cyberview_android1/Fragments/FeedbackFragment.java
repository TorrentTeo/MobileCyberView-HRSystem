package com.example.cyberview_android1.Fragments;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.cyberview_android1.Home;
import com.example.cyberview_android1.R;
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

import static android.content.Context.MODE_PRIVATE;


public class FeedbackFragment extends Fragment {
    private Spinner spinner;
    private String selected = "";
    private static final String[] paths = {"Workplace", "Activities", "Recommendations", "Other"};
    private Button submit;
    private TextView Content;

    public FeedbackFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);

        View RootView = inflater.inflate(R.layout.fragment_feedback, container, false);
        spinner = (Spinner)RootView.findViewById(R.id.spinner);

        ArrayAdapter<String>adapter = new ArrayAdapter<String>(getActivity(),
                android.R.layout.simple_spinner_item,paths);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                selected = parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                selected = "";
            }
        });


        submit = (Button)RootView.findViewById(R.id.submit);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Gson gson = new Gson();
                String jsonData = myPrefs.getString("LoginModel", "");
                LoginModel obj = gson.fromJson(jsonData, LoginModel.class);
                Content = (EditText)RootView.findViewById(R.id.content);

                String contentText = Content.getText().toString();
                HashMap<String, String > params = new HashMap<>();
                params.put("regarding", selected);
                params.put("content", contentText);
                params.put("id", obj.getUser().getId());

                try {
                    API requests = new API();
                    JSONObject res = requests.postRequest("employee/feedback", params, obj);
                    boolean error = res.getBoolean("error");
                    if(error){

                    }else{
                        new AlertDialog.Builder(getContext())
                                .setTitle("Success")
                                .setMessage("Feedback submitted Successfully")

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
                }catch (JSONException exception) {
                    Log.d("JSONException", "Json exception catched :".concat(exception.getMessage()));
                }catch (IOException e) {
                    e.printStackTrace();
                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        // Inflate the layout for this fragment
        return RootView;
    }
}