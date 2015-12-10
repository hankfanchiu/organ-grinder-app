class TracksController < ApplicationController
  def index
    render json: Track.all
  end

  def create
    render json: Track.create!(track_params)
  end

  def destroy
    track = Track.find(params[:id])
    render json: track.destroy!
  end

  private

  def track_params
    params.require(:track).permit(:name, :roll)
  end
end
