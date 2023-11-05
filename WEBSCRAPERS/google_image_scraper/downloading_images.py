import base64
from io import BytesIO
from PIL import Image
import requests
import imghdr



def covert_with_base_64_format(query, position, url):
	# Replace the URL with your data URI
	data_uri = url

	# Split the data URI to get the base64-encoded data
	_, base64_data = data_uri.split(",")

	# Decode the base64 data
	image_data = base64.b64decode(base64_data)

	# Create an image from the decoded data
	image = Image.open(BytesIO(image_data))

	# Save the image to a file
	image.save(f"./{query.upper()}/{query}{position+1}.jpg")

	print(f"Image saved as '{query}{position}.jpg'")



def download_with_the_request_library(query, position, url):
	# URL of the image
	image_url = url

	# Send an HTTP GET request to the image URL
	response = requests.get(image_url)

	# Check if the request was successful (status code 200)
	if response.status_code == 200:
		# Determine the file format using imghdr
		image_format = imghdr.what(None, h=response.content)
		
		if image_format:
		    # Construct a filename with the determined format
		    filename = f"./{query.upper()}/{query}{position+1}.{image_format.lower()}"
		    
		    # Save the image content to the file
		    with open(filename, "wb") as file:
		        file.write(response.content)
		    
		    print(f"Image downloaded successfully as '{filename}'")
		else:
		    print("Failed to determine image format")
	else:
		print("Failed to download image")



def check_the_url_to_determine_route(query, position, url):
	if url.split(':')[0] == "data":
		covert_with_base_64_format(query, position, url)
	else:
		download_with_the_request_library(query, position, url)
