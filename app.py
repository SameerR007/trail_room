from flask import Flask, request, jsonify
#from your_model import generate_outfit_image  # Your trained model function
from PIL import Image
import matplotlib.pyplot as plt
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/generate-outfit', methods=['POST'])
def generate_outfit():
    data = request.json
    user_image = data.get('userImage')
    outfit_image = data.get('outfitImage')
    image = Image.open(user_image)
    plt.imshow(image)
    plt.axis('off') 
    plt.show()
    
    # Pass the images to your model and generate the result
    #generated_image = generate_outfit_image(user_image, outfit_image)
    
    #return jsonify({"generatedImage": generated_image})

if __name__ == '__main__':
    app.run(debug=True)
