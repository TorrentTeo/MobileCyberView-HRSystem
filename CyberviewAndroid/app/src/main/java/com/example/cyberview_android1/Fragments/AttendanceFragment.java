package com.example.cyberview_android1.Fragments;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.cyberview_android1.R;
import com.example.cyberview_android1.StartPage;
import com.example.cyberview_android1.connectivity.API;
import com.example.cyberview_android1.models.LoginModel;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;

import static android.content.Context.MODE_PRIVATE;
import static androidx.core.content.ContextCompat.getSystemService;


public class AttendanceFragment extends Fragment {
    private Button submit;
    private Button checkOut;
    private TextView attendanceCode;
    private String longitude;
    private String latitude;
    final private int REQUEST_CODE_ASK_PERMISSIONS = 123;
    LocationManager mLocationManager;

    public AttendanceFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        SharedPreferences myPrefs = this.getActivity().getSharedPreferences("myPrefs", MODE_PRIVATE);
        View RootView = inflater.inflate(R.layout.fragment_attendance, container, false);
        submit = (Button) RootView.findViewById(R.id.submit);
        checkOut = (Button) RootView.findViewById(R.id.checkOut);
        API requests = new API();

        checkOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Gson gson = new Gson();
                String loginModel = myPrefs.getString("LoginModel", "");
                LoginModel loginModel1 = gson.fromJson(loginModel, LoginModel.class);
                HashMap<String, String> params = new HashMap<>();
                params.put("time", Instant.now().toString() );
                params.put("id", loginModel1.getUser().getId());

                try {

                    JSONObject res = requests.putRequest("employee/Attendance", params, loginModel1);
                    boolean error = res.getBoolean("error");
                    if (error) {
                        new AlertDialog.Builder(getContext())
                                .setTitle("OOPS")
                                .setMessage("Something went wrong please try again, if the problem persists contact the admin")

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
                    } else {
                        new AlertDialog.Builder(getContext())
                                .setTitle("Success")
                                .setMessage("Successfully Checkedout")

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
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                }
            }
        });





        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Gson gson = new Gson();
                String loginModel = myPrefs.getString("LoginModel", "");
                LoginModel loginModel1 = gson.fromJson(loginModel, LoginModel.class);

                String attendance = myPrefs.getString("attendance", "");

                if(attendance == ""){

                }


                attendanceCode = (EditText) RootView.findViewById(R.id.attendanceCode);
                String attendanceCodeText = attendanceCode.getText().toString();
                HashMap<String, String> params = new HashMap<>();

                Location location = getLastKnownLocation();

                latitude = String.valueOf(location.getLatitude());
                longitude = String.valueOf(location.getLongitude());
                params.put("longitude", longitude);
                params.put("latitude", latitude);
                params.put("code", attendanceCodeText);

                try {

                    JSONObject res = requests.postRequest("employee/Attendance", params, loginModel1);
                    boolean error = res.getBoolean("error");
                    if (error) {
                        new AlertDialog.Builder(getContext())
                                .setTitle("OOPS")
                                .setMessage("Something went wrong please try again, if the problem persists contact the admin")

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
                    } else {
                        new AlertDialog.Builder(getContext())
                                .setTitle("Success")
                                .setMessage("Attendance Submitted Successfully")

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
                } catch (JSONException exception) {
                    Log.d("JSONException", "Json exception catched :".concat(exception.getMessage()));
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        // Inflate the layout for this fragment
        return RootView;
        // Inflate the layout for this fragment
    }

    private Location getLastKnownLocation() {
        mLocationManager = (LocationManager) getActivity().getSystemService(Context.LOCATION_SERVICE);
        List<String> providers = mLocationManager.getProviders(true);
        Location bestLocation = null;
        for (String provider : providers) {
            if (ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, REQUEST_CODE_ASK_PERMISSIONS);
            }

            Location l = mLocationManager.getLastKnownLocation(provider);
            if (l == null) {
                continue;
            }
            if (bestLocation == null || l.getAccuracy() < bestLocation.getAccuracy()) {
                // Found best last known location: %s", l);
                bestLocation = l;
            }
        }
        return bestLocation;
    }
}

