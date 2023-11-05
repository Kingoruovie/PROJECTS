import csv
import requests


base_url = "https://www.jobberman.com/jobs"
page_num = 1
datas = [["Name of job", "Employer", "Other details", "Job function", "Description"]]

try:
    while True:
        url = f"{base_url}?page={page_num}"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
        
        job_listings = soup.find_all("div", attrs={"data-cy": "listing-cards-components"})
        
        if not job_listings:
            break
        
        for listing in job_listings:

            name_of_job = listing.find("p", class_="text-lg font-medium break-words text-link-500").text.strip()
            employer = listing.find("p", class_="text-sm text-link-500").text.strip()
            other_details = []
            some_details = listing.find_all("span", class_="mb-3 px-3 py-1 rounded bg-brand-secondary-100 mr-2 text-loading-hide")
            for detail in some_details:
                other_details.append(" ".join(detail.text.split()))
            job_function = listing.find("p", class_="text-sm text-gray-500 text-loading-animate inline-block").text.strip()
            description = listing.find("p", class_="text-sm font-normal text-gray-700 md:text-gray-500 md:pl-5").text.strip()
            
            data = [
                name_of_job,
                employer,
                other_details,
                job_function,
                description
            ]
            
            datas.append(data)
        page_num += 1
except:
    pass

# File name
csv_file_name = "data3.csv"

# Writing data to CSV file
with open(csv_file_name, mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(datas)

print(f"Data has been saved to '{csv_file_name}'.")

