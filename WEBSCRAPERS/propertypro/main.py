import requests
from bs4 import BeautifulSoup


from pathlib import Path
import csv
import pprint
import sys


base_url = "https://www.propertypro.ng/property-for-sale?page="
first_page = 0
last_page = 763
path_to_file = Path("./propertypro/data/properties_for_sale.csv")

def save_to_file(data):
    with open(file=path_to_file, mode="a", encoding="UTF-8", newline="\n") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(data)


def scrape_page(url):
    data = []
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    house_listings = soup.select("div.property-listing")
    for house_listing in house_listings:
        name = house_listing.select_one(".pl-title h3 a").text
        location = house_listing.select_one(".pl-title p").text
        price = house_listing.select_one(".pl-price h3").text
        date_added = house_listing.select_one("div.property-listing-content > p").text
        tags = ",".join([tag.text.strip() for tag in house_listing.select(".pl-badge-grid > .pl-badge-left ul > li")])
        furnished_area = " ".join([fur_area.strip() for fur_area in house_listing.select_one(".pl-price h6").text.split(" ")])
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
