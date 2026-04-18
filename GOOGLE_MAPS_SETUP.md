# Google Maps Integration Setup Guide

## **Required Steps to Enable Google Maps:**

### **1. Get Google Maps API Key**

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create New Project** or use existing project
3. **Enable APIs**:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. **Create API Key**:
   - Go to "Credentials" -> "Create Credentials" -> "API Key"
   - **IMPORTANT**: Restrict the API key for security

### **2. API Key Restrictions**

**For Production (Recommended):**
```
Application restrictions: HTTP referrers
Referrers: 
- http://localhost:8080/*
- https://yourdomain.com/*
```

**API Restrictions:**
- Maps JavaScript API
- Places API
- Geocoding API

### **3. Update API Key in Project**

Replace `YOUR_API_KEY` in these files:

#### **File 1: views/layouts/boilerplate.ejs**
```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&callback=initMap&libraries=places">
</script>
```

#### **File 2: views/layouts/boilerplate.ejs (Line 27-29)**
- Find: `key=YOUR_API_KEY`
- Replace with: `key=AIzaSyC...YOUR_ACTUAL_KEY`

### **4. Features Implemented**

#### **Property Location Display:**
- Interactive map on property details page
- Custom red markers with property info
- "Get Directions" functionality
- Beautiful map styling

#### **Location Picker (Admin):**
- Interactive map when creating new listings
- Click on map to select exact location
- Address autocomplete with Google Places
- Coordinate capture automatically

#### **Styling Features:**
- Custom map styling (minimalist design)
- Red theme matching website
- Responsive design for mobile
- Loading animations
- Dark mode support

### **5. Testing the Integration**

#### **Test Property Display:**
1. Login as admin: `admin` / `admin123`
2. Create a new property with location
3. View the property details page
4. Map should show property location

#### **Test Location Picker:**
1. Go to "Add new Listing" page
2. Map should load with Delhi as default
3. Search for locations or click on map
4. Coordinates should update automatically

### **6. Troubleshooting**

#### **Common Issues:**

**Issue: "Loading map..." stuck**
- Check API key is correct
- Verify APIs are enabled
- Check browser console for errors

**Issue: Map not showing**
- API key restrictions too strict
- Network connectivity issues
- JavaScript errors

**Issue: Autocomplete not working**
- Places API not enabled
- API key restrictions
- JavaScript conflicts

#### **Debug Steps:**
1. Open browser console (F12)
2. Look for Google Maps errors
3. Check network requests
4. Verify API key usage in Google Cloud Console

### **7. College Project Benefits**

#### **Technical Skills Demonstrated:**
- Third-party API integration
- Geospatial data handling
- Interactive UI components
- JavaScript async programming
- API key security practices

#### **Features for College Presentation:**
- Real-world application
- Professional UI/UX design
- Advanced functionality
- Industry-standard practices
- Impressive demonstration

### **8. Security Notes**

#### **API Key Protection:**
- Never commit API key to Git
- Use environment variables in production
- Restrict API key usage
- Monitor API usage

#### **Environment Variables (Future Enhancement):**
```javascript
// In production
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
```

### **9. Cost Management**

#### **Free Tier Limits:**
- Maps JavaScript API: $200/month free
- Places API: $200/month free
- Geocoding API: $200/month free

#### **Usage Monitoring:**
- Monitor Google Cloud Console
- Set up billing alerts
- Track API usage patterns

### **10. Advanced Features (Future)**

#### **Potential Enhancements:**
- Street View integration
- Nearby places detection
- Distance calculations
- Route planning
- Multiple property markers on home page

---

## **Quick Start Checklist:**

- [ ] Get Google Maps API key
- [ ] Enable required APIs
- [ ] Set API key restrictions
- [ ] Update API key in boilerplate.ejs
- [ ] Test property display
- [ ] Test location picker
- [ ] Verify all features working

**Total Implementation Time: 30-45 minutes**

**College Project Impact: HIGH - Very impressive feature!**
