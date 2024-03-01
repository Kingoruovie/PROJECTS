import requests
from bs4 import BeautifulSoup


import csv
import sys
from pathlib import Path


URL_FIRST_PATH = "https://www.billboard.com/charts/year-end/"
URL_SECOND_PATH = "/billboard-global-200/"
END_YEAR = 2023
START_YEAR = 2021
FILE_DIR = Path("./billboard_year_end_global_200/data/")

data_format = [
    "artist",
    "song",
]


def generate_url(year):
    return f"{URL_FIRST_PATH}{year}{URL_SECOND_PATH}"


def scrape_chart_for_the_year(url):
    data = [data_format, ]
    response = requests.get(url=url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    songs = soup.select("div.o-chart-results-list-row-container > ul > li.lrv-u-width-100p > ul")
    for song in songs:
        song_detail = song.select_one("li")
        song_name = song_detail.select_one("h3#title-of-a-story").text.strip()
        artist = song_detail.select_one("span").text.strip()
        data.append([artist,song_name])
    return data
    
    
        
        
if __name__ == "__main__":
    for year in range(START_YEAR, END_YEAR+1):
        url = generate_url(year=year)
        year_chart = scrape_chart_for_the_year(url=url)
        
        with open(FILE_DIR / Path(f"{year}.csv"), mode="w", encoding="UTF-8", newline="\n") as file:
            writer = csv.writer(file)
            writer.writerows(year_chart)
            print(f"Done ==========> {year}")