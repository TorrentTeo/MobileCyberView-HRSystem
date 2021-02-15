package com.example.cyberview_android1.connectivity;

import android.os.AsyncTask;
import android.util.Log;

import com.example.cyberview_android1.models.LoginModel;
import com.example.cyberview_android1.models.UserModel;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.List;
import static com.example.cyberview_android1.connectivity.Config.API;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
public class API {
    JSONObject Jobject = null;
    public JSONObject getHttpResponse(String url, LoginModel loginModel) throws IOException {

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(API() + url)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + loginModel.getToken())
                .build();
        try {
            Response res = client.newCall(request).execute();
            String jsonData = res.body().string();
            Jobject = new JSONObject(jsonData);
        } catch (JSONException e) {
            Log.i("Error","Failed to connect: "+e.getMessage());
        }
        return Jobject;
    }

    public JSONObject postLoginRequest(String url, HashMap<String, String> params) throws IOException {

        MediaType MEDIA_TYPE = MediaType.parse("application/json");

        OkHttpClient client = new OkHttpClient();
        JSONObject postdata = new JSONObject();
        try {
            for (String param : params.keySet()) {
                postdata.put(param, params.get(param));
            }
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        RequestBody body = RequestBody.create(MEDIA_TYPE, postdata.toString());
        Request request = new Request.Builder()
                .url(API() + url)
                .post(body)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .build();
        try {
            Response res = client.newCall(request).execute();
            String jsonData = res.body().string();
            Jobject = new JSONObject(jsonData);
        } catch (JSONException e) {
            Log.i("Error","Failed to connect: "+e.getMessage());
        }
        return Jobject;
    }

    public JSONObject postRequest(String url, HashMap<String, String> params, LoginModel loginModel) throws IOException {

        MediaType MEDIA_TYPE = MediaType.parse("application/json");

        OkHttpClient client = new OkHttpClient();
        JSONObject postdata = new JSONObject();
        if(params != null){
            try {
                for (String param : params.keySet()) {
                    postdata.put(param, params.get(param));
                }
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }


        RequestBody body = RequestBody.create(MEDIA_TYPE, postdata.toString());
        Request request = new Request.Builder()
                .url(API() + url)
                .post(body)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + loginModel.getToken())
                .build();
        try {
            Response res = client.newCall(request).execute();
            String jsonData = res.body().string();
            Jobject = new JSONObject(jsonData);
        } catch (JSONException e) {
            Log.i("Error","Failed to connect: "+e.getMessage());
        }
        return Jobject;
    }

    public JSONObject putRequest(String url, HashMap<String, String> params, LoginModel loginModel) throws IOException {

        MediaType MEDIA_TYPE = MediaType.parse("application/json");

        OkHttpClient client = new OkHttpClient();
        JSONObject postdata = new JSONObject();
        if(params != null){
            try {
                for (String param : params.keySet()) {
                    postdata.put(param, params.get(param));
                }
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }


        RequestBody body = RequestBody.create(MEDIA_TYPE, postdata.toString());
        Request request = new Request.Builder()
                .url(API() + url)
                .put(body)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + loginModel.getToken())
                .build();
        try {
            Response res = client.newCall(request).execute();
            String jsonData = res.body().string();
            Jobject = new JSONObject(jsonData);
        } catch (JSONException e) {
            Log.i("Error","Failed to connect: "+e.getMessage());
        }
        return Jobject;
    }
}
