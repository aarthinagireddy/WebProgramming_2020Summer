package com.example.vijaya.androidhardware;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AudioRecordingActivity extends AppCompatActivity {
    Button btnStartRecord, btnStopRecord, btnStartPlay, btnStopPlay;
    MediaRecorder mediaRecorder;
    MediaPlayer mediaPlayer;
    String pathSave = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_record);
        btnStartRecord = findViewById(R.id.btnStartRecord);
        btnStartRecord.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startrecord();
            }
        });
        btnStopRecord = findViewById(R.id.btnStopRecord);
        btnStopRecord.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopRecord();
            }
        });
        btnStartPlay = findViewById(R.id.btnStartPlay);
        btnStartPlay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                playRecord();
            }
        });

        btnStopPlay = findViewById(R.id.btnStopPlay);
        btnStopPlay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopPlay();
            }
        });

        if (!checkPermission()) {
            requestPermission();
        }
    }

    public void startrecord() {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String filename = "sample" + timeStamp + ".3gp";
        pathSave = getFilesDir() + filename;

        setupMediaRecord();
        try {
            mediaRecorder.prepare();

        } catch (IOException e) {
            e.printStackTrace();
        }
        mediaRecorder.start();
        startRecorderService();
    }


    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{
                Manifest.permission.RECORD_AUDIO
        }, 1000);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case 1000:
                break;
        }
    }

    private boolean checkPermission() {
        int recordPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO);
        return recordPermission == PackageManager.PERMISSION_GRANTED;
    }

    private void setupMediaRecord() {
        mediaRecorder = new MediaRecorder();
        mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        mediaRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
        mediaRecorder.setOutputFile(pathSave);
    }

    public void stopRecord() {
        if (mediaRecorder != null) {
            mediaRecorder.release();
            mediaRecorder = null;
            stopRecorderService();
        }
    }
        public void playRecord() {
            mediaPlayer = new MediaPlayer();
            try {
                mediaPlayer.setDataSource(pathSave);
                mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                    @Override
                    public void onCompletion(MediaPlayer mediaPlayer) {
                        stopPlay();
                    }
                });
                mediaPlayer.prepare();
                mediaPlayer.start();
                startPlayerService();

            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        public void stopPlay () {
            if (mediaPlayer != null) {
                mediaPlayer.release();
                mediaPlayer = null;
                stopPlayerService();
            }
            setupMediaRecord();
            stopPlayerService();
        }
        private void startRecorderService ()
        {
            Intent serviceIntent = new Intent(this, recorderservice.class);
            serviceIntent.putExtra("inputExtra", "Recording in progress");
            ContextCompat.startForegroundService(this, serviceIntent);
        }

        private void stopRecorderService () {
            Intent serviceIntent = new Intent(this, recorderservice.class);
            stopService(serviceIntent);
        }

        private void startPlayerService () {
            Intent serviceIntent = new Intent(this, playerservice.class);
            serviceIntent.putExtra("inputExtra", "Playing recording");
            ContextCompat.startForegroundService(this, serviceIntent);
        }

        private void stopPlayerService () {
            Intent serviceIntent = new Intent(this, playerservice.class);
            stopService(serviceIntent);
        }
    }

