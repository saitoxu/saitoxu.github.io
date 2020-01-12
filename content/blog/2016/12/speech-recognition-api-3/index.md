---
title: "Speech Recognition API (3)"
date: "2016-12-09T00:00:00.000Z"
tags:
  - Swift
  - iOS
  - Xcode
---
This is continued article of [the previous post]({{ site.baseurl }}/2016/12/07/speech-recognition-api-2.html).

This time, we will finally implement the speech recognition part.

#### **Step 9**
The method to recognize speech is as below.

```swift
import UIKit
import Speech

class ViewController: UIViewController {

    // ...

    private func startRecording() throws {
        refreshTask()

        let audioSession = AVAudioSession.sharedInstance()
        try audioSession.setCategory(AVAudioSessionCategoryRecord)
        try audioSession.setMode(AVAudioSessionModeMeasurement)
        try audioSession.setActive(true, with: .notifyOthersOnDeactivation)

        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()

        guard let inputNode = audioEngine.inputNode else { fatalError("Audio engine has no input node") }
        guard let recognitionRequest = recognitionRequest else { fatalError("Unable to created a SFSpeechAudioBufferRecognitionRequest object") }

        recognitionRequest.shouldReportPartialResults = true

        recognitionTask = speechRecognizer.recognitionTask(with: recognitionRequest) { [weak self] result, error in
            guard let `self` = self else { return }

            var isFinal = false

            if let result = result {
                self.label.text = result.bestTranscription.formattedString
                isFinal = result.isFinal
            }

            if error != nil || isFinal {
                self.audioEngine.stop()
                inputNode.removeTap(onBus: 0)

                self.recognitionRequest = nil
                self.recognitionTask = nil

                self.startBtn.isEnabled = true
                self.startBtn.setTitle("Start", for: [])
                self.label.text = ""
            }
        }

        let recordingFormat = inputNode.outputFormat(forBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { (buffer: AVAudioPCMBuffer, when: AVAudioTime) in
            self.recognitionRequest?.append(buffer)
        }

        try startAudioEngine()
    }

    private func refreshTask() {
        if let recognitionTask = recognitionTask {
            recognitionTask.cancel()
            self.recognitionTask = nil
        }
    }

    private func startAudioEngine() throws {
        audioEngine.prepare()
        try audioEngine.start()
    }
}

// ...
```

#### **Step 10**
Call the above `startRecording()` method when tapping the start button.

```swift
import UIKit
import Speech

class ViewController: UIViewController {

    // ...

    @IBAction func start(_ sender: Any) {
        if audioEngine.isRunning {
            audioEngine.stop()
            recognitionRequest?.endAudio()
            startBtn.isEnabled = false
            startBtn.setTitle("Stopping", for: .disabled)
        } else {
            try! startRecording()
            startBtn.setTitle("Clear", for: [])
        }
    }
}

// ...
```

#### **Step 11**
That's it!

Please run the app and speak something.
Your voice will be recognized, and the content will be displayed as text.

It was a bit long, thank you for reading to the end.
