package com.example.cyberview_android1.Fragments;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.Bundle;
import com.example.cyberview_android1.models.LoginModel;
import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.UserModel;


import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.cyberview_android1.R;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;

import static android.content.Context.MODE_PRIVATE;


public class ContractFragment extends Fragment {
    private Button submit;
    private TextView contractTxt;
    private TextView tnaBox;
    private TextView name1;
    private TextView name2;




    public ContractFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);
        View RootView = inflater.inflate(R.layout.fragment_contract, container, false);
        submit = (Button) RootView.findViewById(R.id.contract_submit);


        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Gson gson = new Gson();
                String loginModel = myPrefs.getString("LoginModel", "");
                LoginModel loginModel1 = gson.fromJson(loginModel, LoginModel.class);
                API requests = new API();


                contractTxt = (EditText) RootView.findViewById(R.id.contractText);
                tnaBox = (EditText) RootView.findViewById(R.id.tnaBox);
                name1 = (EditText) RootView.findViewById(R.id.name1);
                name2 = (EditText) RootView.findViewById(R.id.name2);

                String contract = contractTxt.getText().toString();
                String terms = tnaBox.getText().toString();
                String nametext1 = name1.getText().toString();
                String nametext2 = name2.getText().toString();
                String parties;

                HashMap<String, String> params = new HashMap<>();




                try {

                    JSONObject obj = new JSONObject();
                    params.put("title", contract);
                    params.put("terms", terms);
                    obj.put("party1", nametext1);
                    obj.put("party2", nametext2);

                    parties = obj.toString();
                    params.put("parties", parties);

                    JSONObject res = requests.postRequest("employee/clientcontract",params,loginModel1);
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




        // Inflate the layout for this fragment
        return RootView;
    }
}