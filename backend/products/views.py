# products/views.py

import json
import os
from django.http import JsonResponse
from django.conf import settings

GOLD_PRICE = 50.0  # USD per gram

def get_star_rating(score):
    return round(score * 5, 1)

def calculate_price(popularity_score, weight):
    return (popularity_score + 1) * weight * GOLD_PRICE

def product_list(request):
    # Build path to products.json
    file_path = os.path.join(
        settings.BASE_DIR, 'products', 'products.json'
    )

    with open(file_path, 'r', encoding='utf-8') as f:
        products = json.load(f)

    product_list = []
    for product in products:
        price = calculate_price(product['popularityScore'], product['weight'])
        rating = get_star_rating(product['popularityScore'])
        product_data = {
            'name': product['name'],
            'price': round(price, 2),
            'rating': rating,
            'images': product['images'],
        }
        product_list.append(product_data)

    return JsonResponse(product_list, safe=False)
