import file from 'fs';
import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const apiKey = 'AIzaSyCk51vidd4IPj4Ms_lH_3JTuKhQsbTvlAg';
// console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);
async function uploadToGemini(path, mimeType) {
	const uploadResult = await fileManager.uploadFile(path, {
		mimeType,
		displayName: path,
	});
	const file = uploadResult.file;
	console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
	return file;
}
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

async function run(query) {
	// console.log(query);
	// const files = file.readdir();

	const files = [await uploadToGemini('./controllers/file.csv', 'text/csv')];
	// console.log(files);
	await waitForFilesActive(files);

	const chatSession = model.startChat({
		generationConfig,
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

	const result = await chatSession.sendMessage(query);
	// console.log(result);
	// console.log(result.response.text());
	return result.response.text();
}
const geminiAdvice = async (req, res, next) => {
	try {
		// console.log(req);
		const { query } = req.body;
		console.log(req.file);
		const response = await run(query);
		res.status(200).json({
			response: response,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
export { geminiAdvice };
