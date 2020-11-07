package yamini.newshub.summer.mobileproject.api;

import yamini.newshub.summer.mobileproject.Model.News;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;
import yamini.newshub.summer.mobileproject.Model.News;

public interface ApiClient {

    @GET("top-headlines?country=in")
    Call<News> getNews(@Query("category") String category,
                       @Query("apiKey") String apiKey
    );


    @GET("http://newsapi.org/v2/top-headlines?country=in&apiKey=1316a3a46ab7495dbac82df10d54539e")
    Call<News> getNews();
}
