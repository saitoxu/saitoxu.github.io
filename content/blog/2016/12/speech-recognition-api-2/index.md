---
title: "Speech Recognition API (2)"
date: "2016-12-07T00:00:00.000Z"
tags: Swift iOS Xcode
---
This is continued article of [the previous post]({{ site.baseurl }}/2016/12/02/speech-recognition-api.html).

#### **Step 5**
Add a label and a button to first view on storyboard.

![Storyboard]({{ site.baseurl }}/images/2016-12-07-storyboard.png)

#### **Step 6**
Next, load required modules and create a method called when tapping the button.

Please choose a language which you want to recognize as locale when initializing `SFSpeechRecognizer`.

```swift
import UIKit
import Speech

class ViewController: UIViewController {

    private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "ja-JP"))!
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private let audioEngine = AVAudioEngine()

    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var startBtn: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()

        startBtn.isEnabled = false
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    public override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }

    @IBAction func start(_ sender: Any) {
        // TODO
    }
}
```

#### **Step 7**
Add extension of `SFSpeechRecognizerDelegate` to `ViewController`.

```swift
extension ViewController: SFSpeechRecognizerDelegate {
    func speechRecognizer(_ speechRecognizer: SFSpeechRecognizer, availabilityDidChange available: Bool) {
        if available {
            startBtn.isEnabled = true
            startBtn.setTitle("Start", for: [])
        } else {
            startBtn.isEnabled = false
            startBtn.setTitle("Clear", for: .disabled)
        }
    }
}
```

And make the initial state of button disabled.

```swift
class ViewController: UIViewController {

    // ...

    override func viewDidLoad() {
        super.viewDidLoad()

        speechRecognizer.delegate = self
        startButton.isEnabled = false
    }

    // ...
}
```

#### **Step 8**
To use speech recognition, the app needs user's permission.

So add process to get the permission and call it when the view is appeared.

```swift
class ViewController: UIViewController {

    // ...

    public override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        requestRecognizerAuthorization()
    }

    // ...

    private func requestRecognizerAuthorization() {
        SFSpeechRecognizer.requestAuthorization { authStatus in
            OperationQueue.main.addOperation { [weak self] in
                guard let `self` = self else { return }

                switch authStatus {
                case .authorized:
                    self.startBtn.isEnabled = true

                case .denied:
                    self.startBtn.isEnabled = false
                    self.startBtn.setTitle("Access denied", for: .disabled)

                case .restricted:
                    self.startBtn.isEnabled = false
                    self.startBtn.setTitle("Access restricted", for: .disabled)

                case .notDetermined:
                    self.startBtn.isEnabled = false
                    self.startBtn.setTitle("No permission", for: .disabled)
                }
            }
        }
    }
}

// ...
```

Next, I'll write the main process to recognize speech when tapping the `start` button.
