from flask import Flask, render_template, request
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    # Connect to your MySQL database
    db_connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='thirdeye'
    )

    # Fetch data from the database
    query = "SELECT title, year_of_release, description, tag, genre, likeCount FROM videos;"
    movies_df = pd.read_sql(query, con=db_connection)

    # Close the database connection
    db_connection.close()

    # Content-based filtering using TF-IDF
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    genres_tags_matrix = tfidf_vectorizer.fit_transform(movies_df['genre'] + ' ' + movies_df['tag'])

    # Process user input from the form
    user_preferences = {
        'genresWatched': request.form.getlist('genresWatched'),
        'tagsWatched': request.form.getlist('tagsWatched'),
        'likedVideos': list(map(int, request.form.getlist('likedVideos')))
    }

    # Combine user preferences with user and video data
    user_liked_videos = movies_df[movies_df['likeCount'].isin(user_preferences['likedVideos'])]
    user_genres_tags = ', '.join(user_preferences['genresWatched'] + user_preferences['tagsWatched'])
    user_data = pd.DataFrame({'genre': [user_genres_tags], 'tag': [user_genres_tags]})

    # Calculate similarity using linear kernel
    user_matrix = tfidf_vectorizer.transform(user_data['genre'] + ' ' + user_data['tag'])
    cosine_similarities = linear_kernel(user_matrix, genres_tags_matrix).flatten()

    # Adjust the threshold for selecting recommended videos
    video_indices = cosine_similarities.argsort()[:-10:-1]  # Top 2 recommendations

    # Get video details based on similarity scores
    top_recommendations = movies_df.loc[video_indices, ['title', 'year_of_release', 'genre', 'tag', 'likeCount']]

    return render_template('recommendations.html', recommendations=top_recommendations.to_dict('records'))

if __name__ == '__main__':
    app.run(debug=True)