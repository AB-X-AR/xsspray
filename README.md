# **XSSPRAY** <img width="32" height="32" alt="icon32" src="https://github.com/user-attachments/assets/aee6d1fb-232e-4afa-bd16-57d6bfe07491" />


> A Chrome extension for security researchers and penetration testers to efficiently test XSS payloads during authorized security assessments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://www.google.com/chrome/)

## ⚠️ Legal Disclaimer

**IMPORTANT: This tool is designed EXCLUSIVELY for authorized security testing and research purposes.**

- Only use this tool on applications you own or have explicit written permission to test
- Unauthorized testing of web applications is illegal and unethical
- The developers assume no liability for misuse of this tool
- Always obtain proper authorization before conducting security assessments

## 📋 Overview

XSSPRAY is a lightweight Chrome extension that streamlines XSS (Cross-Site Scripting) testing workflows by providing quick access to a customizable payload library through a right-click context menu. Perfect for bug bounty hunters, penetration testers, and security researchers conducting authorized assessments.

## ✨ Features

- **Right-Click Context Menu** - Instantly access payloads by right-clicking on any input field
- **Custom Payload Library** - Manage and organize your own XSS payload collection
- **Smart Insertion** - Automatically inserts payloads at cursor position in input fields, textareas, and contentEditable elements
- **Import/Export** - Easily share and backup your payload collections
- **Audit Logging** - Track which payloads were tested and where
- **Lab Mode** - Safety feature to ensure intentional usage
- **150+ Pre-loaded Payloads** - Comprehensive starter collection covering various XSS vectors

## 🚀 Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/AB-X-AR/xsspray.git
   cd xsspray
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked** and select the `xsspray` folder

5. The XSSPRAY icon should now appear in your extensions toolbar

## 📖 Usage

### Basic Workflow

1. **Navigate to your target** (ensure you have authorization!)

2. **Click on an input field** where you want to test

3. **Right-click** to open the context menu

4. **Select "XSSPRAY ▶"** to see your payload list

5. **Click any payload** to insert it into the field

6. **Submit and observe** the application behavior

<img width="932" height="596" alt="image" src="https://github.com/user-attachments/assets/0ce34aee-c3c8-47a3-93ac-ace1ff284d4c" />


### Managing Payloads

1. Click the XSSPRAY extension icon or right-click → **Options**

2. **Add/Edit Payloads**: Modify the textarea (one payload per line)

3. **Save**: Click "Save" to update your payload library

4. **Import**: Load payloads from a `.txt` file

5. **Export**: Download your current payload collection

6. **Rebuild Menu**: Refresh the context menu with updated payloads

### Payload File Format

Payloads are stored one per line in plain text:

```
<script>alert(1)</script>
<img src=x onerror=alert(1)>
# This is a comment and will be ignored
"><svg onload=alert(document.domain)>
```

- Lines starting with `#` are treated as comments
- Blank lines are ignored
- Each non-comment line becomes a menu item

## 🏗️ Project Structure

```
xsspray/
├── icons/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (context menu logic)
├── content.js            # Content script (payload insertion)
├── options.html          # Options page UI
├── options.js            # Options page logic
├── payloads.txt          # Default payload collection
├── sandbox.html          # Safe testing sandbox
└── README.md             # This file
```

## 🔧 Technical Details

### Manifest V3

XSSPRAY is built using Chrome's Manifest V3 architecture, ensuring modern security standards and better performance.

### Permissions

- `contextMenus` - Create right-click menu items
- `activeTab` - Access the currently active tab
- `scripting` - Inject content scripts
- `storage` - Save payloads and preferences
- `host_permissions: <all_urls>` - Work on any website (required for security testing)

### Key Features

- **Smart Insertion**: Respects cursor position and text selection
- **Framework Compatible**: Triggers input/change events for React, Vue, Angular
- **ContentEditable Support**: Works with rich text editors
- **Persistent Storage**: Payloads saved locally using chrome.storage API

## 🛡️ Security Considerations

### For Users

- This extension has broad permissions by design (required for security testing)
- Only install from trusted sources
- Keep your payload library private
- Review audit logs regularly

### For Developers

- No external network calls (all data stays local)
- No analytics or tracking
- Open source for transparency
- Minimal dependencies

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style
- Test your changes thoroughly
- Update documentation as needed
- Add payloads that are novel and effective
- Ensure all features work in latest Chrome stable

## 📝 Payload Sources

The default payload collection includes vectors from:

- XSS Filter Evasion Cheat Sheet
- PortSwigger XSS Cheat Sheet
- OWASP Testing Guide
- Bug bounty writeups
- Security research papers

## 🐛 Known Issues

- Context menu may take a moment to appear on first right-click after installation
- Some web applications with CSP (Content Security Policy) may block certain payloads
- Rich text editors with custom implementations may require special handling

## 🗺️ Roadmap

- [ ] Payload categories and filtering
- [ ] Payload effectiveness rating system
- [ ] Export audit logs to CSV
- [ ] Firefox extension port
- [ ] Payload templates with variables
- [ ] Integration with Burp Suite
- [ ] Automatic payload encoding options

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Security research community
- OWASP Project
- Chrome extension documentation
- Bug bounty platforms

## 📧 Contact

For questions, suggestions, or security concerns:

- **GitHub Issues**: [Create an issue](https://github.com/AB-X-AR/xsspray/issues)
- **Email**: mashikabsardheen@gmail.com
- **Twitter**: https://x.com/ABXAR_7x30

---

**Remember: With great power comes great responsibility. Use XSSPRAY ethically and legally.**

⭐ If you find this tool useful, please consider starring the repository!
