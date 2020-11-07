package yamini.newshub.summer.mobileproject.Activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.text.method.LinkMovementMethod;

import java.util.ArrayList;

import yamini.newshub.summer.mobileproject.Activity.Animation.Dolphin;
import yamini.newshub.summer.mobileproject.Adapter.HomeAdapter;
import e.vatsal.kesarwani.mobileproject.Model.HomeList;
import yamini.newshub.summer.mobileproject.R;
import yamini.newshub.summer.mobileproject.YoutubeActivity;

public class homefinal extends AppCompatActivity {

    private RecyclerView recyclerView;
    private HomeAdapter adapter;
    private ArrayList<HomeList> listCategory;
    private ImageView fab;
    private TextView textView;
    private Intent intent;
    private ImageButton youtubeapi;
//    private ImageView mImageView;
  //  private static final int CAMERA_REQUST_CODE =1001;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home_activtiy);

    //    mImageView = findViewById(R.id.cameraView);
      //  findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
        //    @Override
          //  public void onClick(View v) {
            //    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
              //  startActivityForResult(intent, CAMERA_REQUST_CODE);
            //}
       // });
youtubeapi = findViewById(R.id.youtube);
        youtubeapi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), YoutubeActivity.class);
                intent.putExtra("USE_A_CONSTANT_HERE_AS_KEY", R.drawable.y);
                startActivity(intent);
            }
        });
        initviews();
        textView = findViewById(R.id.textViewLink);
        textView.setMovementMethod(LinkMovementMethod.getInstance());


        listCategory.add(new HomeList("Technology",R.drawable.ic_tech,getDrawable(R.drawable.ic_black)));
        listCategory.add(new HomeList("Technology",R.drawable.ic_tech,getDrawable(R.drawable.ic_purplelist)));
        listCategory.add(new HomeList("Entertainment",R.drawable.ic_enter,getDrawable(R.drawable.ic_pinklistt)));
        listCategory.add(new HomeList("Sports",R.drawable.ic_spo,getDrawable(R.drawable.ic_purplelist)));
        listCategory.add(new HomeList("Health",R.drawable.ic_hos,getDrawable(R.drawable.ic_pinklistt)));
        listCategory.add(new HomeList("Science",R.drawable.ic_sci,getDrawable(R.drawable.ic_purplelist)));
        listCategory.add(new HomeList("Business",R.drawable.ic_buss,getDrawable(R.drawable.ic_pinklistt)));
        listCategory.add(new HomeList("null",R.drawable.ic_tech,getDrawable(R.drawable.ic_purplelist)));
        //listCategory.add(new HomeList("null",R.drawable.ic_listblue,getDrawable(R.drawable.ic_listblue)));

        recyclerView=findViewById(R.id.homeRecycle);
        adapter=new HomeAdapter(this,listCategory);
        recyclerView.setHasFixedSize(true);

        new ItemTouchHelper(itemTouchHelper).attachToRecyclerView(recyclerView);
        recyclerView.setAdapter(adapter);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(),RoomData.class));
            }
        });

    }

    private void initviews() {
        fab=findViewById(R.id.fab);

        listCategory=new ArrayList<>();

        intent = new Intent(homefinal.this, Dolphin.class);
    }

    ItemTouchHelper.SimpleCallback itemTouchHelper=new ItemTouchHelper.SimpleCallback(0,ItemTouchHelper.RIGHT | ItemTouchHelper.LEFT) {
        @Override
        public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, @NonNull RecyclerView.ViewHolder target) {
            return false;
        }

        @Override
        public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {
            //Toast.makeText(homefinal.this, ""+listCategory.get(viewHolder.getAdapterPosition()).getCatName(), Toast.LENGTH_SHORT).show();
            if ("null".equals(listCategory.get(viewHolder.getAdapterPosition()).getCatName())) {
                adapter.notifyDataSetChanged();
            }
            else {
                intent.putExtra("news", listCategory.get(viewHolder.getAdapterPosition()).getCatName());
                adapter.notifyDataSetChanged();
                startActivity(intent);
            }
        }
    };



    @Override
    public void onBackPressed() {
        super.onBackPressed();
        finishAffinity();
        finish();
    }
    //@Override
    /*protected void onActivityResult(int requestCode, int resultCode,Intent data)
    {
        super.onActivityResult(requestCode,resultCode,data);

        if(requestCode ==CAMERA_REQUST_CODE)
        {
            if (resultCode ==RESULT_OK){
                Bitmap bitmap =(Bitmap) data.getExtras().get("data");
                mImageView.setImageBitmap(bitmap);

            }
        }
    }*/
}
