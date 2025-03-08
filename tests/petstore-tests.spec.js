const { test, expect } = require('@playwright/test');

test.describe.serial('Petstore API Tests', () => {

    let petIds = [];
    const petDataList = [
        {
            name: 'Fluffy',
            photoUrls: ['https://example.com/photo1.jpg'],
            status: 'available',
        },
        {
            name: 'Rex',
            photoUrls: ['https://example.com/photo2.jpg'],
            status: 'sold',
        },
        {
            name: 'Bella',
            photoUrls: ['https://example.com/photo3.jpg'],
            status: 'pending',
        },
    ];

    // Test 1: Add multiple pets to the store with multiple data sets
    test('Add multiple pets to the store', async ({ request }) => {
        for (let petData of petDataList) {
            const newPet = {
                id: Math.floor(Math.random() * 10000), // Random ID
                name: petData.name,
                photoUrls: petData.photoUrls,
                status: petData.status,
            };

            // Log the request data
            console.log('Request Data:', JSON.stringify(newPet, null, 2));

            // Send POST request to add the new pet
            const response = await request.post('https://petstore.swagger.io/v2/pet', {
                data: newPet,
            });

            // Log the response data
            const responseData = await response.json();
            console.log('Response Data:', JSON.stringify(responseData, null, 2));

            // Validate the response status
            expect(response.status()).toBe(200);

            petIds.push(responseData.id); // Save the pet ID for later use

            // Validate the pet data
            expect(responseData.name).toBe(petData.name);
            expect(responseData.status).toBe(petData.status);
            expect(responseData.photoUrls).toEqual(petData.photoUrls);
        }
    });

    // Test 2: Find pets by their IDs and validate
    test('Find pets by ID', async ({ request }) => {
        // Ensure we have valid petIds (these will be from the pets added in the previous test)
        expect(petIds.length).toBeGreaterThan(0);

        // Loop through each petId and validate the pet data
        for (let i = 0; i < petIds.length; i++) {
            const petId = petIds[i];
            const petData = petDataList[i];

            // Log the request for GET request
            console.log(`Requesting pet with ID: ${petId}`);

            // Send GET request to find the pet by ID
            const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

            // Log the response data
            const pet = await response.json();
            console.log('Response Data:', JSON.stringify(pet, null, 2));

            // Validate the response status
            expect(response.status()).toBe(200);

            expect(pet.id).toBe(petId);
            expect(pet.name).toBe(petData.name);  // Validate name matches
            expect(pet.status).toBe(petData.status);  // Validate status matches
            expect(pet.photoUrls).toEqual(petData.photoUrls);  // Validate photoUrls matches
        }
    });

});