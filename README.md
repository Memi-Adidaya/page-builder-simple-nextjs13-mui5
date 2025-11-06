# Page Builder Simple NextJS13 MUI-5
Sebuah Page Builder Sederhana Berbasis *Next JS 13* (Page Router) dan *Material UI Versi 5*.
Versi React JS yang aman untuk tech stack ini adalah: React Versi ^18

# Fitur
Setiap Block memiliki pengaturan atau attribute yang bisa disesuaikan. Berikut beberapa fitur standar:
1. Layout (Container, Columns)
2. Block (Dynamic Content)
3. Media Block (Image and Youtube Video)
4. Preview Results (Auto Reload Preview)
5. Refersh Page ( Refresh Layout Editor Tidak Menghilangkan Layout Yang Sedang di-Edit)
6. Purge Saved Layout (Menghapus data layout dari memori/browser)

# Screenshoot & Demo (Video)
<p><a href="https://youtu.be/NZ-cCxjGboM" alt="Demo Video">Lihat Preview Demo</a></p>
<img width="1917" height="931" alt="Simple Builder" src="https://github.com/user-attachments/assets/f37ad9b2-ee7c-4c82-85e5-c2b131d1c810" />


# Siap Integrasi ?
Tergantung bagaimana flow aplikasi Anda. Output dari Page Builder ini adalah:
*Skema JSON* yang siap dirender dihalaman manapun sesuai dengan konsep aplikasi Anda.

# Info
Repo ini menggunakan Material UI Versi 5 yang masih membutuhkan webpack. Jadi jangan lupa pengaturan tersebut di config Next JS.

# Instruksi
1. Clone
2. npm install
3. npm run dev

# JSON Skema
Setelah berhasil dijalankan, kemudian coba buat layout sederhana. Kemudian buka browser console, dan tekan tombol Save. Dan Anda akan melihat bentuk format Skema JSON tersebut.
Skema itu bisa disimpan ke database. Contoh hasil generate seperti berikut:
<code>
[
  {
    "type": "container",
    "props": {
      "columns": [
        []
      ],
      "backgroundColor": "transparent",
      "padding": 12,
      "gap": 3
    },
    "columns": [
      [
        {
          "id": "b28a8d08-7894-402f-9edc-354b59a962f8",
          "type": "ImageWithCaption",
          "props": {
            "src": "https://images.pexels.com/photos/33487835/pexels-photo-33487835.jpeg",
            "alt": "Placeholder image with caption",
            "caption": "This is a descriptive caption.",
            "objectFit": "cover",
            "height": 480,
            "borderRadius": 3
          }
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "props": {
      "text": "<p>This is a paragraph. You can edit this text by clicking on it. Use the properties panel on the right to change its style, including font, size, color, alignment, and line height. This component allows for flexible and rich text content on your page.</p><p><br></p><p>This is a paragraph. You can edit this text by clicking on it. Use the properties panel on the right to change its style, including font, size, color, alignment, and line height. This component allows for flexible and rich text content on your page.<br></p>",
      "fontFamily": "Roboto",
      "fontSize": 16,
      "textColor": "#333333",
      "textAlign": "center",
      "lineHeight": 1.5,
      "padding": 1
    }
  },
  {
    "type": "spacer-horizontal",
    "props": {
      "gap": 64
    }
  },
  {
    "type": "two-column",
    "props": {
      "columns": [
        [],
        []
      ],
      "backgroundColor": "transparent",
      "gap": 16,
      "padding": 16
    },
    "columns": [
      [
        {
          "id": "7a0d3fce-1052-44bf-89bd-40d09ddbd14a",
          "type": "ImageWithCaption",
          "props": {
            "src": "https://images.pexels.com/photos/11481752/pexels-photo-11481752.jpeg",
            "alt": "Placeholder image with caption",
            "caption": "This is a descriptive caption.",
            "objectFit": "cover",
            "height": 300,
            "borderRadius": 3
          }
        }
      ],
      [
        {
          "id": "6c815ac3-f540-4a85-8e92-09b3492328e2",
          "type": "ImageWithCaption",
          "props": {
            "src": "https://images.pexels.com/photos/34454975/pexels-photo-34454975.jpeg",
            "alt": "Placeholder image with caption",
            "caption": "This is a descriptive caption.",
            "objectFit": "cover",
            "height": 300,
            "borderRadius": 3
          }
        }
      ]
    ]
  },
  {
    "type": "spacer-horizontal",
    "props": {
      "gap": 34
    }
  },
  {
    "type": "success-story",
    "props": {
      "title": "Success Story",
      "subtitle": "PUMA presents the latest shoes from its collection. Light & comfortable made with highly durable material.",
      "titleFontFamily": "Georgia",
      "titleFontSize": 42,
      "titleColor": "#008080",
      "subtitleFontFamily": "Helvetica",
      "subtitleFontSize": 16,
      "subtitleColor": "#555555",
      "backgroundColor": "#F9F6F1",
      "padding": 48,
      "cards": [
        {
          "imageUrl": "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600",
          "title": "John Smith",
          "subtitle": "PUMA presents the latest shoes from its collection.",
          "slug": "#john-smith"
        },
        {
          "imageUrl": "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600",
          "title": "Adam Lambert",
          "subtitle": "PUMA presents the latest shoes from its collection.",
          "slug": "#adam-lambert"
        },
        {
          "imageUrl": "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600",
          "title": "Kenny Stewart",
          "subtitle": "PUMA presents the latest shoes from its collection.",
          "slug": "#kenny-stewart"
        },
        {
          "imageUrl": "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600",
          "title": "Michael Stevenson",
          "subtitle": "PUMA presents the latest shoes from its collection.",
          "slug": "#michael-stevenson"
        }
      ]
    }
  },
  {
    "type": "ImageGrid",
    "props": {
      "title": "Photo Gallery",
      "images": [
        {
          "src": "https://placehold.co/400",
          "alt": "Image 1"
        },
        {
          "src": "https://placehold.co/400",
          "alt": "Image 2"
        },
        {
          "src": "https://placehold.co/400",
          "alt": "New Image"
        },
        {
          "src": "https://placehold.co/400",
          "alt": "New Image"
        }
      ],
      "columns": 4,
      "gap": 16,
      "backgroundColor": "#ffffff",
      "objectFit": "cover"
    }
  }
]
</code>

# ToDo
1. Penambahan blok komponen (Maps, Hero Image, Slideshow, dll)
2. HTML Generate

