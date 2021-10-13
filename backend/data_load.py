import csv
from datetime import date, datetime
from app import create_app

app = create_app()
app.app_context().push()
from app import db
from models import Movie, Tv

with open('movie_db_total_final.csv', 'r', encoding='UTF-8') as f:
    reader = csv.DictReader(f)

    for row in reader:
        print(row)
        release_date = datetime.strptime(
						row['release_date'], '%Y-%m-%d').date()
        poster_path = f"https://image.tmdb.org/t/p/original{row['poster_path']}"
        
        movie = Movie(
						title=row['title'], 
                        poster_path=poster_path,
                        overview=row['overview'],
						release_date=release_date,
                        runtime=int(row['runtime']),  
						popularity=row['popularity'],
                        origin_country=row['origin_country'], 
						genres=row['genres_name'], 
                        keywords = row['keywords_name'],
                        like_count = 0,
                        positive_comment = row['positive_comment'],
                        negative_comment = row['negative_comment'],
                        cast = row['cast'],
                        director = row['director'],
                        rank = int(row['rank'])
					
        )
        print("gg",movie.poster_path)
        db.session.add(movie)

    db.session.commit()

with open('tv_db_total_final.csv', 'r', encoding='UTF-8') as f:
    reader = csv.DictReader(f)

    for row in reader:
        print(row)
        release_date = datetime.strptime(
						row['first_air_date'], '%Y-%m-%d').date()
        poster_path = f"https://image.tmdb.org/t/p/original{row['poster_path']}"
        
        if row['runtime'] != '[]':
            line_run = row['runtime'].replace("[", '')
            runtime = line_run.replace("]", '')
            run_list = runtime.split(', ')
            run_list = [int(i) for i in run_list]
            print(type(run_list))
            runtime = sum(run_list)/len(run_list)
        else:
            runtime = None
        
        tv = Tv(
						name=row['name'], 
                        poster_path=poster_path,
                        overview=row['overview'],
						first_air_date=release_date,
                        runtime=runtime,  
						popularity=row['popularity'],
                        origin_country=row['origin_country'], 
						genres=row['genres_name'], 
                        keywords = row['keywords_name'],
                        like_count = 0,
                        positive_comment = row['positive_comment'],
                        negative_comment = row['negative_comment'],
                        cast = row['cast'],
                        director = row['director'],
                        rank = int(row['rank'])
					
        )
        print("gg",tv.poster_path)
        db.session.add(tv)

    db.session.commit()