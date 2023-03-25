class Response {
  constructor(res) {
    this.res = res;
  }

  success(data, results = null) {
    if (results) {
      return this.res.status(200).json({ status: "success", results, data });
    } else {
      return this.res.status(200).json({ status: "success", data });
    }
  }

  created(data) {
    return this.res.status(201).json({ status: "success", data });
  }

  noContent(message) {
    return this.res.status(204).json({ status: "success", message: message });
  }

  badRequest(message) {
    return this.res.status(400).json({ status: "fail", message: message });
  }

  notFound(message) {
    return this.res.status(404).json({ status: "fail", message: message });
  }

  unProcessableEntity(message) {
    return this.res.status(422).json({ status: "fail", message: message });
  }

  serverError(message) {
    return this.res.status(500).json({ status: "error", message: message });
  }
}

module.exports = Response;
