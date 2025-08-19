# How to Change Your Website Logo

Your WooShop website now supports custom logo uploads! Here's how to change your logo:

## Method 1: Using the Admin Panel
1. Visit: `http://your-website.com/admin-logo.html`
2. Click on the upload area or drag and drop your logo file
3. Preview how it will look in both header and footer
4. Click "Apply New Logo" to save your changes

## Method 2: Direct File Replacement
1. Replace the file `images/logo.png` with your new logo
2. Make sure to keep the same filename: `logo.png`
3. Recommended size: 200x80 pixels or similar aspect ratio
4. Use PNG format with transparent background for best results

## Supported File Formats
- PNG (recommended for transparency)
- JPG/JPEG
- SVG (vector format)

## Recommended Logo Specifications
- **Dimensions**: 200x80 pixels (or similar 2.5:1 ratio)
- **Background**: Transparent (PNG format)
- **File Size**: Less than 2MB
- **Colors**: Should work well on both white (header) and dark (footer) backgrounds

## Technical Details
- The logo appears in both the website header and footer
- If your custom logo fails to load, a fallback SVG logo will be displayed
- Custom logos are stored in browser localStorage for persistence
- The system automatically handles different screen sizes

## Fallback System
If your custom logo file is missing or fails to load:
1. The system will automatically show a blue flame/leaf SVG logo
2. No broken image icons will appear
3. The website continues to function normally

## Tips for Best Results
1. **Transparency**: Use PNG with transparent background
2. **Contrast**: Ensure your logo is visible on both light and dark backgrounds
3. **Size**: Keep file size small for faster loading
4. **Aspect Ratio**: Maintain a reasonable width-to-height ratio
5. **Testing**: Preview on different devices and screen sizes

## Need Help?
- Visit the admin panel at `/admin-logo.html` for an easy upload interface
- Check the browser console for any error messages
- Ensure your image file meets the specifications above