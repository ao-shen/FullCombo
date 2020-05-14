// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const COMMAND = 'full-combo.command';

let documentChangeListenerDisposer = null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "full-combo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('full-combo.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		console.log('heheheh');
		vscode.window.showInformationMessage('Hello World from Full Combo!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand(COMMAND, () => vscode.env.openExternal(vscode.Uri.parse('https://unicode.org/emoji/charts-12.0/full-emoji-list.html')))
	);

	documentChangeListenerDisposer = vscode.workspace.onDidChangeTextDocument(onDidChangeTextDocument);
}
exports.activate = activate;

function onDidChangeTextDocument(event) {
	let total = "";

	event.contentChanges.forEach(change => {
		total += change.text;
	});

	if(total == "") {
		total = "DELETE";
	}

	console.log(total);

	vscode.window.showInformationMessage(total);
}


// this method is called when your extension is deactivated
function deactivate() {
	if (documentChangeListenerDisposer) {
		documentChangeListenerDisposer.dispose();
		documentChangeListenerDisposer = null;
	}
}

module.exports = {
	activate,
	deactivate
};