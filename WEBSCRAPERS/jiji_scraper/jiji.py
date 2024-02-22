import requests
import pprint
import csv
from bs4 import BeautifulSoup
from pathlib import Path



# Querying jiji
page_num = 1
headers = {
    'x-requested-with': 'XMLHttpRequest'
}

    
def query_jiji(product_name):
    
    web_url = 'https://jiji.ng/api_web/v1/listing?query=' + '+'.join(product_name.split())
    response = requests.get(web_url, headers=headers, params={'page': page_num}).json()
    contents = []
    
    try:
        for item in response['adverts_list']['adverts']:
            inner_content = [
                item['title'],
                item['category_name'],
                item['images'][0]['url'],
                item['price_obj']['value'],
                'https://jiji.ng' + item['url'],
            ]
            
            contents.append(inner_content)
        return contents
    except:
        return None

search_value = input("product name to search for: ")

main_content = [["Name of product", "Product category", "Product image url", "product value in #", "product_link"]]



while True:
    new_contents = query_jiji(search_value)
    
    if new_contents is None or page_num >= 200:
        break
        
    main_content.extend(new_contents)
    
    
    page_num += 1

# File name
csv_file_name = Path(f"./jiji_scraper/data/{"_".join(search_value.split(" "))}_data.csv")

# Writing data to CSV file
with open(csv_file_name, mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(main_content)

print(f"Data has been saved to '{csv_file_name}'.")
