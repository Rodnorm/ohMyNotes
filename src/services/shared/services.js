
startTimer = () => {
    this.clearTimer();
    if (this.state.isSavingEnabled && this.state.autoSave) {
        this.typingTimer = setTimeout(this.saveNote, this.timing);
    }
}

clearTimer = () => {
    clearTimeout(this.typingTimer);
}