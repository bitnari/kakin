from cefpython3 import cefpython as cef
import sys

sys.excepthook = cef.ExceptHook
cef.Initialize()


class Kakin(object):
    def __init__(self, game_name):
        self.game_name = game_name

    def login(self):
        cef.CreateBrowserSync(
            url="http://localhost:8080", window_title=self.game_name)
        cef.MessageLoop()
        cef.Shutdown()
