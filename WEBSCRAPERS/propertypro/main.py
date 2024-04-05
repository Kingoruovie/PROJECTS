import requests
from bs4 import BeautifulSoup


from pathlib import Path
import csv
import pprint
import sys


base_url = "https://www.propertypro.ng/property-for-short-let?page="
first_page = 0
last_page = 61
path_to_file = Path("./propertypro/data/properties_for_short_let.csv")

def save_to_file(data):
    with open(file=path_to_file, mode="a", encoding="UTF-8", newline="\n") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(data)


def scrape_page(url):
    data = []
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    house_listings = soup.select("div.single-room-sale.listings-property")
    for house_listing in house_listings:
        name = house_listing.select_one("div.single-room-text > a").text
        location = house_listing.select_one("div.single-room-text > h4").text
        price = house_listing.select_one("div.single-room-text > div.n50 h3").text
        date_added = house_listing.select_one("div.single-room-text > h5").text
        tags = ",".join([tag.strip() for tag in house_listing.select_one("div.single-room-text > .furnished-btn").text.split("\n")])
        furnished_area = " ".join([fur_area.strip() for fur_area in house_listing.select_one("div.single-room-text > .fur-areea").text.split("\n")])
        data.append([
            name,
            location,
            price,
            date_added,
            tags,
            furnished_area
        ])
        
    return data
        
    
scrape_page(base_url + "0")

if __name__ == "__main__":
    for page in range(first_page, last_page + 1):
        returned_data = scrape_page(base_url + str(page))
        save_to_file(returned_data)
        sys.stdout.write("\r")
        sys.stdout.write(" " * 50)
        sys.stdout.write("\r")
        print(f"Page {page + 1} done", end="", flush=True)
        