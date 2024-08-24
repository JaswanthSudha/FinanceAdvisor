/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} = require('@google/generative-ai');
const { GoogleAIFileManager } = require('@google/generative-ai/server');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */
async function uploadToGemini(path, mimeType) {
	const uploadResult = await fileManager.uploadFile(path, {
		mimeType,
		displayName: path,
	});
	const file = uploadResult.file;
	console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
	return file;
}

/**
 * Waits for the given files to be active.
 *
 * Some files uploaded to the Gemini API need to be processed before they can
 * be used as prompt inputs. The status can be seen by querying the file's
 * "state" field.
 *
 * This implementation uses a simple blocking polling loop. Production code
 * should probably employ a more sophisticated approach.
 */
async function waitForFilesActive(files) {
	console.log('Waiting for file processing...');
	for (const name of files.map((file) => file.name)) {
		let file = await fileManager.getFile(name);
		while (file.state === 'PROCESSING') {
			process.stdout.write('.');
			await new Promise((resolve) => setTimeout(resolve, 10_000));
			file = await fileManager.getFile(name);
		}
		if (file.state !== 'ACTIVE') {
			throw Error(`File ${file.name} failed to process`);
		}
	}
	console.log('...all files ready\n');
}

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash',
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: 'text/plain',
};

async function run() {
	// TODO Make these files available on the local file system
	// You may need to update the file paths
	const files = [
		await uploadToGemini(
			'child labour ppt (Converted - 2024-07-22 15:24)',
			'application/vnd.google-apps.presentation',
		),
	];

	// Some files have a processing delay. Wait for them to be ready.
	await waitForFilesActive(files);

	const chatSession = model.startChat({
		generationConfig,
		// safetySettings: Adjust safety settings
		// See https://ai.google.dev/gemini-api/docs/safety-settings
		history: [
			{
				role: 'user',
				parts: [
					{
						fileData: {
							mimeType: files[0].mimeType,
							fileUri: files[0].uri,
						},
					},
				],
			},
		],
	});

	const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
	console.log(result.response.text());
}

run();
