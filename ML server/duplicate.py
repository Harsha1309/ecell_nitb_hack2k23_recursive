from flask import Flask, request, jsonify
import cv2
from skimage.metrics import structural_similarity as ssim
import requests

# # TODO add contour detection for enhanced accuracy
# path1="https://images.dog.ceo/breeds/chihuahua/n02085620_3742.jpg"
# path2="https://images.dog.ceo/breeds/chihuahua/n02085620_3742.jpg"


img_data = requests.get("https://images.dog.ceo/breeds/pitbull/IMG_20190826_121528_876.jpg").content
with open('image_name.jpg', 'wb') as handler:
    handler.write(img_data)

# img1_data = requests.get("https://images.dog.ceo/breeds/lhasa/n02098413_7163.jpg").content
# with open('image_name1.jpg', 'wb') as handler:
#     handler.write(img1_data)

# def match(path1, path2):
#     # read the images
#     img1 = cv2.imread(path1)
#     img2 = cv2.imread(path2)
#     # turn images to grayscale
#     img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
#     img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
#     # resize images for comparison
#     img1 = cv2.resize(img1, (300, 300))
#     img2 = cv2.resize(img2, (300, 300))
#     # display both images
#     cv2.imshow("One", img1)
#     cv2.imshow("Two", img2)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()
#     similarity_value = "{:.2f}".format(ssim(img1, img2)*100)
#     # print("answer is ", float(similarity_value),
#     #       "type=", type(similarity_value))
#     sd=float(similarity_value)
#     return str(sd)


# ans = match("Capture.PNG","asd.PNG")
# # print(img_data)
# print(ans)
# # print(type(ans))


app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/match', methods=['POST'])
def match():
    variable_name = request.get_json()
    img_data1 = variable_name['img1'] 
    # Get the buffer data of the second image
    img_data2 = variable_name['img2']
    # Read the images from the buffer data
    img_data = requests.get(img_data1).content
    with open('image_name.jpg', 'wb') as handler:
        handler.write(img_data)
    img_data = requests.get(img_data2).content
    with open('image_name.jpg', 'wb') as handler:
        handler.write(img_data)

    # Turn images to grayscale
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    # Resize images for comparison
    img1 = cv2.resize(img1, (300, 300))
    img2 = cv2.resize(img2, (300, 300))
    # Calculate similarity value
    similarity_value = "{:.2f}".format(ssim(img1, img2)*100)
    similarity = float(similarity_value)
    # Create the result dictionary
    result = {
        "similarity": similarity
    }
    # Return the result as a JSON object
    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True)
