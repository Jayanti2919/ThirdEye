from flask import Flask, render_template, request
from pymongo import MongoClient
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
# import mysql.connector

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/thirdeye'
db = SQLAlchemy(app)

mongo_client = MongoClient('mongodb://localhost:27017/')
mongo_db = mongo_client['Users']
collection = mongo_db['user_preferences']


class Video(db.Model):
    __tablename__ = 'videos'
    videoHash = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    uploadDate = db.Column(db.String(255))
    description = db.Column(db.String(255))
    tags = db.Column(db.String(255))
    genre = db.Column(db.String(255))
    likeCount = db.Column(db.Integer)

    # Connect to your MySQL database
# db_connection = mysql.connector.connect(
#     host='localhost',
#     user='root',
#     password='',
#     database='thirdeye'
# )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    # Connect to your MySQL database
    # db_connection = mysql.connector.connect(
    #     host='localhost',
    #     user='root',
    #     password='',
    #     database='thirdeye'
    # )

    movies = Video.query.all()
    movies_df = pd.DataFrame([(movie.title, movie.uploadDate, movie.description, movie.tags, movie.genre, movie.likeCount) for movie in movies],
                             columns=['title', 'uploadDate', 'description', 'tags', 'genre', 'likeCount'])

    # Fetch data from the database
    # query = "SELECT title, uploadDate, description, tags, genre, likeCount FROM videos;"
    # movies_df = pd.read_sql(query, con=db_connection)

    # Close the database connection
    # db_connection.close()

    user_preferences = collection.find_one({'userId': '1'})


    # Process user input from the form
    # user_preferences = {
    #     'genresWatched': {'Action': 2, 'Romance': 5, 'Horror': 1},
    #     'tagsWatched': ['Funny', 'Sad', 'Sci_fi'],
    #     'likedVideos': [101, 150, 200]
    # }
 
    # Combine user preferences with user and video data
    #user_liked_videos = movies_df[movies_df['likeCount'].isin(user_preferences['likedVideos'])]
    user_genres_tags = ', '.join([genre for genre, count in user_preferences['genresWatched'].items() for _ in range(count)] + user_preferences['tagsWatched'])
    user_data = pd.DataFrame({'genre': [user_genres_tags], 'tags': [user_genres_tags]})

    # Content-based filtering using TF-IDF
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    genres_tags_matrix = tfidf_vectorizer.fit_transform(movies_df['genre'] + ' ' + movies_df['tags'])
    
    # Calculate similarity using linear kernel
    user_matrix = tfidf_vectorizer.transform(user_data['genre'] + ' ' + user_data['tags'])
    cosine_similarities = linear_kernel(user_matrix, genres_tags_matrix).flatten()

    # Adjust the threshold for selecting recommended videos
    video_indices = cosine_similarities.argsort()[:-10:-1]  # Top 2 recommendations

    # Get video details based on similarity scores
    top_recommendations = movies_df.loc[video_indices, ['title', 'uploadDate', 'genre', 'tags', 'likeCount']]

    return render_template('recommendations.html', recommendations=top_recommendations.to_dict('records'))

if __name__ == '__main__':
    # db_connection = mysql.connector.connect(
    #     host='localhost',
    #     user='root',
    #     password='',
    #     database='thirdeye'
    # )
    # print(db_connection)
    app.run(debug=True)