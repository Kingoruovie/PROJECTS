import requests
from bs4 import BeautifulSoup


from datetime import date, timedelta
from pathlib import Path
import csv
import sys


BEGIN_DATE = date(2000, 1, 1)
END_DATE = date(2024, 1, 13)
DELTA = timedelta(days=7)
URL = "https://www.billboard.com/charts/hot-100/"
FILE_DIR = Path("./billboard/charts/")


billboard_week = None
data_format = [
    "song",
    "artist",
    "Award",
    "Last Week",
    "Peak Position",
    "Weeks on Chart",
]
    



def generate_url():
    global billboard_week
    if billboard_week:
        billboard_week += DELTA
    else:
        billboard_week = BEGIN_DATE
    return URL + str(billboard_week) + "/"

def scrape_chart_for_the_week(url):
    data = [data_format,]
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    rows = soup.select("div.o-chart-results-list-row-container > ul > li.lrv-u-width-100p > ul")
    for row in rows:
        info_list = row.select("li")
        song = info_list[0].select_one("h3#title-of-a-story").text.strip()
        artist = info_list[0].select_one("span").text.strip()
        award = True if info_list[2].children else False
        last_week = info_list[3].text.strip()
        peak_pos = info_list[4].text.strip()
        weeks_on_chart = info_list[5].text.strip()

        data.append([song, artist, award, last_week, peak_pos, weeks_on_chart])
    return data


def write_to_file(file_name, data):
    path_to_file = FILE_DIR / Path(file_name + ".csv")
    with open(path_to_file, mode="w", encoding="utf-8", newline="\n") as file:
        writer = csv.writer(file)
        writer.writerows(data)
 


if __name__ == "__main__":
    total_week = 1254
    percentage_done = 0
    print(f"{percentage_done}%", end="" ,flush=True)

    for count in range(1, total_week + 1):
        url = generate_url()
        returned_data = scrape_chart_for_the_week(url)
        write_to_file(str(billboard_week), returned_data)
        percentage_done = round((count / total_week) * 100, 2)
        sys.stdout.write("\r")
        sys.stdout.write(" " * 30)
        sys.stdout.write("\r")
        print(f"{billboard_week} done <==> {percentage_done}%", end="" ,flush=True)

    print("    ===========> All done successfully 😁😁😁😁😁😁😁😁😁 <==============     ")