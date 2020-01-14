---
title: "Speech Recognition API (1)"
date: "2016-12-02T00:00:00.000Z"
tags:
	- Swift
  - iOS
  - Xcode
---
Let's try voice recognition by using "Speech Recognition API" which is released in iOS 10.0.

Basically, I'll explain the following official sample program.

[SpeakToMe: Using Speech Recognition with AVAudioEngine](https://developer.apple.com/library/prerelease/content/samplecode/SpeakToMe/Introduction/Intro.html)

#### **Environment**
- macOS Sierra 10.12.1
- Xcode 8.1
- iOS 10.1.1

#### **Step 1**
At first, create a new project in Xcode.

#### **Step 2**
Next, move to the project top, and execute `pod init`.

At this time, I don't have a plan to use other libraries,
so this step is not required.

Then, let's open the directory whose extension is `xcworkspace`.

#### **Step 3**
From iOS 10, we have to write purposes to use features related to privacy access in `Info.plist`. Otherwise, the app is terminated forcibly.

Edit `Info.plist` as below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>NSSpeechRecognitionUsageDescription</key>
	<string>sample description</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>sample description</string>

	<!-- ... -->

</dict>
</plist>
```

#### **Step 4**
Open `ViewController.swift`, and import the speech library.

```swift
import Speech
```

I'll write a coding part in next article, because it'll be too long.

Look forward to it!
